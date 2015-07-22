CashCow.Views.UserProfile = Backbone.CompositeView.extend({

  initialize: function(options){

    this.backedProjects = this.model.backedProjects();

    this.followedProjects = this.model.followedProjects();

    this.createdProjects = this.model.createdProjects();

    this.listenTo(this.model, "sync change", this.render);

    this.tabs = {
      "a": this.createdProjects,
      "b": this.backedProjects,
      "c": this.followedProjects
    }

    this.currentPage = 1;
    this.offSet = 3;
    this.currentTab = this.backedProjects;
    this.currentTabId = 'a';
  },

  events: {
    "click .delete-account": "deleteUser",
    "click .tab": "toggleTab",
    "click .prev": "prevPage",
    "click .next": "nextPage"
  },

  prevPage: function (event) {
    event.preventDefault();
    this.currentPage --;
    this.render();
  },

  nextPage: function (event) {
    event.preventDefault();
    this.currentPage ++;
    this.render();
  },

  toggleTab: function (event) {
    this.currentPage = 1;

    var id = $(event.currentTarget).data('id');
    this.currentTabId = id;
    this.currentTab = this.tabs[id];

    this.render();
  },

  template: JST['users/profile'],

  render: function(){

    var html = this.template({
      user: this.model,
      currentTab: this.currentTab,
      currentPage: this.currentPage,
      totalPages: this.currentTab.totalPages(this.offSet),
      offSet: this.offSet
    });
    this.$el.html(html);

    this.$('.tab-titles > li').removeClass('active');
    this.$('.' + this.currentTabId).addClass('active');

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
