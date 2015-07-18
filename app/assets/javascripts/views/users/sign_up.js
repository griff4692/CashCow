CashCow.Views.SignUp = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.model = options.model;
    this.collection = options.collection;
    this.$el.addClass('form');
  },

  template: JST['users/form'],

  events: {
    "submit form": "signUp"
  },

  render: function () {
    var content = this.template({
      user: this.model,
      type: 'signUp'
    });

    this.$el.html(content);
    return this;
  },

  signUp: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);
    this.model.save({}, {
      success: function () {
        CashCow.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      },

      error: function(data){
        console.log(data);
      }
    });
  }
});
