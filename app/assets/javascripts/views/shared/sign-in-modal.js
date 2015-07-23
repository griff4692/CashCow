CashCow.Views.SignInModal = Backbone.View.extend({
  template: JST['shared/sign_in_modal'],

  events: {
    "click #sign-in-close-out": "closeOut",
    "click .modal-submit": "signInUser",
    "click #guest-log-in": "signInAsGuest",
    "click input": "removePlaceHolder"
  },

  initialize: function (options) {
    if(options.callback) {
      this.callback = options.callback;
    }
    this.wrongCombo = false;
    this.emailValue = '';
  },

  signInAsGuest: function (event) {
    var that = this;
    event.preventDefault();
    CashCow.currentUser.signIn({
      email: 'guest@cash-cow.io',
      password: 'password',
      success: that.signInCallback.bind(that)
    })
  },

  closeOut: function () {
    this.$('#sign-in-modal').removeClass('is-open');
  },

  render: function () {
    var content = this.template({
      wrongCombo: this.wrongCombo,
      emailValue: this.emailValue,
    });
    this.$el.html(content);
    this.$('#email').focus();
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
      success: that.signInCallback.bind(that),
      error: function () {
        that.wrongCombo = true;
        that.emailValue = $form.find('#email').val();
        that.render();
      }
    });
  },

  signInCallback: function() {
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
    this.closeOut();
  }
});
