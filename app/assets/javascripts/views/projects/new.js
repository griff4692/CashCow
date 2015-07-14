CashCow.Views.ProjectNew = Backbone.View.extend({
	template: JST["projects/new"],

	tagName: 'form',

	events: {},

	initialize: function () {

	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})
