CashCow.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.root$el = options.root$el;
    this.$projErrors = $('#proj-errors');
    this.collection = options.collection;
    this.collection.fetch();
    this.projCategories = ["Art", "Music", "Philanthropy"];
  },

  routes: {
    "": "projRoot",
    "projects/new": "projectNew"
  },

  projRoot: function () {
    var rootView = new CashCow.Views.ProjectRoot({
      collection: this.collection,
      projCategories: this.projCategories
    });

    this._swapView(rootView);
  },

  projectNew: function () {
    var newProj = new CashCow.Models.Project();
    var newProjView = new CashCow.Views.ProjectForm ({
      model: newProj,
      collection: this.collection,
      $projErrors: this.$projErrors
    });
    this._swapView(newProjView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.root$el.html(view.render().$el);

  }

});
