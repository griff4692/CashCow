CashCow.Views.SignInModal = Backbone.View.extend({
  template: JST['shared/sign_in_modal'],

  events: {
    "click #sign-in-close-out": "closeOut",
    "click .modal-submit": "signInUser",
    "click #guest-log-in": "signInAsGuest"
  },

  signInAsGuest: function (event) {
    var that = this;
    event.preventDefault();
    CashCow.currentUser.signIn({
      email: 'guest@cash-cow.io',
      password: 'password',
      success: function () {
        Backbone.history.navigate('', { trigger: true });
        that.closeOut();
      }
    })
  },

  initialize: function (options) {
    if(options.callback) {
      this.returnToCallback = options.callback;
    }

    var that = this;
    this.callback = function () {
      that.closeOut();
      that.returnToCallback && that.returnToCallback();
    };
  },

  closeOut: function () {
    this.$('#sign-in-modal').removeClass('is-open');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderFormErrors();
    return this;
  },

  signInUser: function(event){
    event.preventDefault();

    var $form = this.$('.user-form');
    var formData = $form.serializeJSON().user;

    var that = this;

    CashCow.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      success: function () { return that.signInCallback() },
      error: function (model, error, options) {
        that.$formErrors = ["Invalid username / password combination"];
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  renderFormErrors: function () {
    var $errorsList = $('<ul>');
    $errorsList.addClass('proj-errors');

    this.$formErrors && that.$formErrors.forEach(function (error) {
      var $newLi = $('<li>');
      $newLi.text(error);
      $errorsList.append($newLi);
    });

    this.$el.prepend($errorsList);
  }
});