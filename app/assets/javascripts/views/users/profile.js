CashCow.Views.UserProfile = Backbone.CompositeView.extend({

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['users/profile'],

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  }

});
