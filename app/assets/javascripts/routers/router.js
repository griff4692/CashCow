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

    this.usersCollection = options.usersCollection;
    this.usersCollection.fetch();
  },

  routes: {
    "": "projRoot",
    "projects/new": "projectNew",
    "projects/discover/:category": "projDiscover",
    "projects/:id": "projShow",
    "users/new": "userNew",
    "session/new": "userSignIn",
    "users/:id": "userProfile"
  },

  userNew: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new this.usersCollection.model();
    var formView = new CasCow.Views.UsersForm({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  userSignIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new CashCow.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  userProfile: function (id) {
    var callback = this.show.bind(this, id);
    if(!this.requireSignedIn(callback)) { return; }

    var model = this.usersCollection.getOrFetch(id);
    var profileView = CashCow.Views.UserProfile({
      model: model
    });

    this._swapView(profileView);
  },

  _requireSignedIn: function(callback){
    if (!CashCow.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.userSignIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (CashCow.currentUser.isSignedIn()) {
      // default is to go home if signed in and trying to sign in
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  projShow: function (id) {
    var model = this.collection.getOrFetch(id);

    var showView = new CashCow.Views.ProjectShow({
      model: model,
      collection: this.collection,
      format: 'detail'
    })

    this._swapView(showView);
  },

  projDiscover: function (category, order) {
    var category = category || "all";
    // fix this!
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
    var callback = this.projectNew.bind(this);
    if(!this._requireSignedIn(callback)) { return; }

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
