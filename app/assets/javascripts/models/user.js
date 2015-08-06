CashCow.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  fullName: function () {
    return this.escape('fname') + " " + this.escape('lname');
  },

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  followedProjects: function () {
     if (!this._followedProjects) {
       this._followedProjects = new CashCow.Collections.Projects([])
     }

     return this._followedProjects;
  },

  backedProjects: function () {
     if (!this._backedProjects) {
       this._backedProjects = new CashCow.Collections.Projects([])
     }

     return this._backedProjects;
  },

  createdProjects: function () {
     if (!this._createdProjects) {
       this._createdProjects = new CashCow.Collections.Projects([])
     }

     return this._createdProjects;
  },

 parse: function (resp) {
   if (resp.followedProjects) {
     this.followedProjects().set(resp.followedProjects, { parse: true });
     delete resp.followedProjects;
   }
   if (resp.backedProjects) {
     this.backedProjects().set(resp.backedProjects, { parse: true });
     delete resp.backedProjects;
   }
   if (resp.createdProjects) {
     this.createdProjects().set(resp.createdProjects, { parse: true });
     delete resp.createdProjects;
   }

   return resp;
 },

  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  }

});

CashCow.Models.Backer = CashCow.Models.User.extend({
  urlRoot: 'na',

  backerWithAmount: function () {
    this.fullName + " has backed the project for $" + this.amount
  }
});

CashCow.Models.CurrentUser = CashCow.Models.User.extend({
  url: "/api/session",

  initialize: function(options) {
    this.listenTo(this, "change", this.fireSessionEvent)
  },

  isSignedIn: function () {
    return !this.isNew();
  },

  follows: function(proj) {
    if (this.get('followedProjects') && this.get('followedProjects').length > 0) {
      this.followedProjects().set(this.get('followedProjects'));
      this.followedProjects.delete;
    }
    return (this.followedProjects().pluck('id').indexOf(proj.id) !== -1);
  },

  backs: function(proj) {
    return (this.backedProjects().pluck('id').indexOf(proj.id) !== -1);
  },

  signIn: function(options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data) {
        model.set(model.parse(data));
        options.success && options.success();
      },

      error: function() {
        options.error && options.error();
      }
    });
  },

  signOut: function(options) {
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.clear();
        options.success & options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  }

});
