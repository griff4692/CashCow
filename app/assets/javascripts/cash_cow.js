window.CashCow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    CashCow.Collections.Projects = new CashCow.Collections.Projects();

    var cashCowRouter = new CashCow.Routers.Router({
      root$el: $('#content'),
      collection: CashCow.Collections.Projects
    });
    Backbone.history.start();
  }
};
