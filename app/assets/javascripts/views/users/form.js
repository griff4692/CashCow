CashCow.Views.UserForm = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.model = options.model;
    this.collection = options.collection;
  },

  template: JST['users/sign_up'],

  events: {
    "submit form": "signUp"
  },

  render: function () {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);

    return this;
  },

  signUp: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);
    this.model.save({}, {
      success: function () {
        CashCow.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      },

      error: function(data){

      }
    });


  }
});
