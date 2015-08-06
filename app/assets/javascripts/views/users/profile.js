CashCow.Views.UserProfile = Backbone.CompositeView.extend({

  initialize: function(options){
    this.backedProjects = this.model.backedProjects();
    this.followedProjects = this.model.followedProjects();
    this.createdProjects = this.model.createdProjects();

    this.listenTo(this.model, "sync change", this.attachListeners);

    this.tabs = {
      "a": this.createdProjects,
      "b": this.backedProjects,
      "c": this.followedProjects
    };

    this.currentPage = 1;
    this.offSet = 3;
    this.currentTab = this.backedProjects;
    this.currentTabId = 'b';
  },

  attachListeners: function () {
    this.listenTo(CashCow.currentUser.backedProjects(), "sync add remove change", this.render);
    this.listenTo(CashCow.currentUser.followedProjects(), "sync add remove change", this.render);
    this.render();
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
    var that = this;
    that.resetSubviews();

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

    this.currentTab.page(this.currentPage, this.offSet).forEach(function (project) {
      var projDetailView = new CashCow.Views.ProjectShow({
        model: project,
        orderCategory: "null",
        higlightTitle: "null",
        collection: "null",
        format: 'thumbnail',
        stats: 'none'
      });
        that.addSubview('.user-projects', projDetailView);
    });

    this.attachSubviews();

    return this;
  },

  deleteUser: function (event) {
    event.preventDefault();
    var that = this;

    that.model.destroy({
      success: function () {
        that.model.clear();
        CashCow.currentUser.clear();
        Backbone.history.navigate('', { trigger: true } )
      }
    });
  }

});
