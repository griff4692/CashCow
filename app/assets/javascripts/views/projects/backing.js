CashCow.Views.BackingForm = Backbone.CompositeView.extend({
	template: JST["projects/backing_form"],

  events: {
    "submit form": "submitBack"
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      model: this.model
    });

    this.$el.html(content);
    return this;
  },

  submitBack: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON()
  }

})
