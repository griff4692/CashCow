CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.catToHighlight = options.primoCategory;
		this.model = options.model;
		this.collection = options.collection;
		this.format = options.format;
	},

	tagName: 'li',

	template: JST['projects/show_highlights'],

	// function () {
	// 	if (this.format === 'highlight') {
	// 		return JST['projects/show_highlights']
	// 	} else {
	// 		return JST['projects/show_details']
	// 	}
	// },

	render: function () {
		var content = this.template({
			model: this.model,
			catToHighlight: this.catToHighlight
		});
		this.$el.html(content);
		return this;
	}

})
