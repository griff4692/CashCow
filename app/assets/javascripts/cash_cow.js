window.CashCow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    CashCow.Collections.projects = new CashCow.Collections.Projects();

    var cashCowRouter = new CashCow.Routers.Router({
      root$el: $('#content'),
      collection: CashCow.Collections.projects
    });
    Backbone.history.start();
  }
};
