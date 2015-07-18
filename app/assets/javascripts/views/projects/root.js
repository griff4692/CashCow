CashCow.Views.ProjectRoot = Backbone.CompositeView.extend({
	template: JST["projects/root"],

	initialize: function (options) {
		this.$el.addClass('carousel');
		this.collection = options.collection;
		this.projCategories = options.projCategories;
		this.orderCategories = options.orderCategories;

		this.projList = this.$('.featured-projects');
		this.generatePrimoSubViews();

		this.listenTo(this.collection, "sync", this.generatePrimoSubViews);
	},

	generatePrimoSubViews: function () {
		this.render();

		var that = this;

		$.each(that.orderCategories, function (primoCategory, array) {
			var primoModel = that.collection.primoBy(
				primoCategory,
				'All',
				array[0]
			);

			if (primoModel !== -1) {
				var primoView = new CashCow.Views.ProjectShow({
					model: primoModel,
					collection: that.collection,
					orderCategory: primoCategory,
					format: "highlight",
					highlightTitle: array[1]
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
