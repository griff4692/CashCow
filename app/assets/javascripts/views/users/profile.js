CashCow.Views.UserProfile = Backbone.CompositeView.extend({

  initialize: function(options){
    this.backedProjects = this.model.backedProjects();
    this.followedProjects = this.model.followedProjects();
    this.createdProjects = this.model.createdProjects();

    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['users/profile'],

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  }

});
