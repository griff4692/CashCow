CashCow.Views.ProjectRoot = Backbone.CompositeView.extend({
	template: JST["projects/root"],

	tagName: 'feature',

	initialize: function (options) {
		this.collection = options.collection;
		this.projCategories = options.projCategories;
		this.orderCategories = options.orderCategories;

		this.projList = this.$('.featured-projects');

		this.listenTo(this.collection, "sync", this.generatePrimoSubViews);
	},

	generatePrimoSubViews: function () {
		this.render();

		var that = this;

		$.each(that.orderCategories, function (primoCategory, direction) {
			var primoModel = that.collection.sortAndOrder(primoCategory, 'none', direction)

			if (primoModel !== -1) {
				var primoView = new CashCow.Views.ProjectShow({
					model: primoModel,
					collection: that.collection,
					orderCategory: primoCategory,
					format: "highlight"
				});

				that.addSubview('.featured-projects', primoView);
			}
		});

		this.render();
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}

})
