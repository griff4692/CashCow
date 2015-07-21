CashCow.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.formErrors = options.formErrors;
    this.callback = options.callback;
    this.listenTo(CashCow.currentUser, "signIn", this.signInCallback);
    this.$el.addClass('form');
  },

  events: {
    "submit form": "submit"
  },

  template: JST['users/form'],

  render: function(){
    var content = this.template({
      model: this.model,
      type: 'signIn'
    })

    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    var that = this;

    CashCow.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      success: function () { return that.signInCallback() },
      error: function (model, error, options) {
        // that.formErrors = ["Invalid username / password combination"];
        // that.renderFormErrors(formErrors);
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
