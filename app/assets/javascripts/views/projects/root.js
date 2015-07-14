CashCow.Views.ProjectRoot = Backbone.CompositeView.extend({
	template: JST["projects/root"],

	tagName: 'feature',

	initialize: function (options) {
		this.collection = options.collection;
		this.projCategories = options.projCategories;
		this.generatePrimoSubViews();
		this.projList = this.$('.featured-projects');
	},

	generatePrimoSubViews: function () {
		var that = this;
		debugger;
		that.projCategories.forEach(function (category) {
			var primoModel = that.collection.primoBy(category)
			if (primoModel !== -1) {
				var primoView = new CashCow.Views.ProjectShow({
					model: primoView,
					collection: that.collection,
					format: "highlight"
				});
			}
		});
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}

})
