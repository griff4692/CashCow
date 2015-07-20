CashCow.Views.UserProfile = Backbone.CompositeView.extend({

  initialize: function(options){
    this.backedProjects = this.model.backedProjects();
    this.followedProjects = this.model.followedProjects();
    this.createdProjects = this.model.createdProjects();

    this.listenTo(this.model, "sync change", this.render);
  },

  events: {
    "click .delete-account": "deleteUser",
    "click .tab": "toggleTab"
  },

  toggleTab: function (event) {
    var that = this;
    $('.tab-content').find('.' + this.currentTabId).removeClass('active');
    this.currentTabId = $(event.currentTarget).data('id');
    setTimeout(function () {
      $('.tab-content').find('.' + that.currentTabId).addClass('active')
    }, 500);
  },

  template: JST['users/profile'],

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  },

  deleteUser: function (event) {
    event.preventDefault();
    var that = this;

    that.model.destroy({
      success: function () {
        console.log("Successfully deleted account!")
        that.model.clear();
        CashCow.currentUser.clear();
        Backbone.history.navigate('', { trigger: true } )
      }
    });
  }

});
