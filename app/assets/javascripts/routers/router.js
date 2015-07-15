CashCow.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.root$el = options.root$el;
    this.$projErrors = $('#proj-errors');
    this.collection = options.collection;
    this.collection.fetch();
    this.projCategories = ["Art", "Music", "Philanthropy"];
    this.orderCategories = {
      'days_left': 'asc',
      'days_gone_by': 'asc',
      'goal': 'desc'
    };
  },

  routes: {
    "": "projRoot",
    "projects/new": "projectNew",
    "projects/discover/:category": "discover",
    "projects/:id": "show"
  },

  show: function (id) {
    var model = this.collection.getOrFetch(id);

    var showView = new CashCow.Views.ProjectShow({
      model: model,
      collection: this.collection,
      format: 'detail'
    })

    this._swapView(showView);
  },

  discover: function (category, order) {
    var category = category || "all";
    // fix that!
    var order = order || "days_left";

    var discoverView = new CashCow.Views.Discover({
      collection: this.collection,

      projCategories: ["All"].concat(this.projCategories),
      orderCategories: this.orderCategories,

      currentCategory: category,
      order: order
    });

    this._swapView(discoverView);
  },

  projRoot: function () {
    var rootView = new CashCow.Views.ProjectRoot({
      collection: this.collection,
      projCategories: this.projCategories,
      orderCategories: this.orderCategories
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
    this.$projErrors.empty();
    this.root$el.html(view.render().$el);
  }

});
