window.CashCow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.root$El = $('#content');
    var cashCowRouter = new CashCow.Routers.Router({
      root$El: this.root$El
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  // CashCow.initialize();
});
