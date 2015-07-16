window.CashCow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    CashCow.Collections.projects = new CashCow.Collections.Projects();

    CashCow.Collections.users = new CashCow.Collections.Users();

    this.currentUser = new CashCow.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new CashCow.Views.Header({
      el: "#header",
    })

    var cashCowRouter = new CashCow.Routers.Router({
      root$el: $('#content'),
      collection: CashCow.Collections.projects,
      usersCollection: CashCow.Collections.users
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CashCow.initialize();
});
