CashCow.Views.ProjectRoot = Backbone.CompositeView.extend({
	template: JST["projects/root"],

	tagName: 'feature',

	initialize: function (options) {
		this.collection = options.collection;
		this.projCategories = projCategories;
		this.generatePrimoSubViews();
	},

	generateProjSubViews: function () {
		var that = this;

		that.projCategories.forEach(function (category) {
			if (that.collection.primo)
		});
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}

})
