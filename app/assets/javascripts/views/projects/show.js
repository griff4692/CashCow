CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.model = options.model;
		this.collection = options.collection;
		this.format = options.format;

		if (this.format === 'highlight') {
			this.catToHighlight = options.orderCategory;
		};

		this.listenTo(this.model, "sync", this.render)
	},

	tagName: 'li',

	template: JST['projects/show'],
		// function () {
		// 	if (this.format === 'highlight') {
		// 		return JST['projects/show_highlights'];
		// 	} else if (this.format === 'detail') {
		// 		return JST['projects/show_details'];
		// 	}
		// },
	//
	// render: function () {
	// 	var content = _.result(this, this.template)({
	// 		model: this.model,
	// 		catToHighlight: this.catToHighlight
	// 	});
	// 	this.$el.html(content);
	// 	return this;
	// }

	render: function () {
			var content = this.template({
				model: this.model,
				type: this.format,
				catToHighlight: this.catToHighlight
			});

			this.$el.html(content);
			return this;
	}

})
