CashCow.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.root$el = options.root$el;
    this.$errors = $('errors');
    this.collection = options.collection;
    this.collection.fetch();
    this.projCategories = ["Art", "Music", "Philanthropy"];
    this.orderCategories = {
      num_followers: ['desc', "Most Popular"],
      funded_status: ['desc', "Most Funded"],
      amount_funded: ['desc', "Most Pledged"],
      days_left: ['asc', "Fewest Days Left"],
    };
  },

  routes: {
    "": "root",
    "projects/new": "projectNew",
    "projects/discover/:category": "projDiscover",
    "projects/:id": "projShow",
    "projects/:id/back": "projBacking",
    "users/new": "userNew",
    "session/new": "userSignIn",
    "users/:id": "userProfile"
  },

  projBacking: function (id) {
    var project = this.collection.getOrFetch(id);

    var backForm = new CashCow.Views.BackingForm({
      model: project
    });

    this._swapView(backForm);
  },

  root: function () {
    var rootView = new CashCow.Views.ProjectRoot({
      collection: this.collection,
      projCategories: this.projCategories,
      orderCategories: this.orderCategories
    });

    this._swapView(rootView);
  },

  userNew: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new CashCow.Collections.users.model();

    var formView = new CashCow.Views.SignUp({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  userSignIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var model = new CashCow.Collections.users.model();

    var signInView = new CashCow.Views.SignIn({
      callback: callback,
      model: model,
      $errors: this.$errors
    });
    this._swapView(signInView);
  },

  userProfile: function (id) {
    var callback = this.userProfile.bind(this, id);

    if(!this._requireSignedIn(callback)) { return; }

    var model = this.usersCollection.getOrFetch(id);
    var profileView = new CashCow.Views.UserProfile({
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

  projectNew: function () {
    var callback = this.projectNew.bind(this);
    if(!this._requireSignedIn(callback)) { return; }

    var newProj = new CashCow.Models.Project();
    var newProjView = new CashCow.Views.ProjectForm ({
      model: newProj,
      collection: this.collection,
      $errors: this.$errors
    });

    this._swapView(newProjView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$errors.empty();
    this.root$el.html(view.render().$el);
  }

});
