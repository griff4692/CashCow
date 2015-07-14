CashCow.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.root$el = options.root$el;
    this.collection = options.collection
  },

  routes: {
    "": "root",
    "projects/new": "newProject"
  },

  root: function () {
    alert('back at root')
    // this._swapView(newProjView);
  },

  newProject: function () {
    var newProjView = new CashCow.Views.ProjectNew ({
      collection: this.collection
    });
    this._swapView(newProjView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.root$el.html(view.render().$el);

  }

});
