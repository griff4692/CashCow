CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.model = options.model;
		this.collection = options.collection;
		this.format = options.format;
	},

	template: function () {
		if (this.format === 'highlight') {
			return JST['projects/show_highlights']
		} else {
			return JST['projects/show_details']
		}
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}

})
