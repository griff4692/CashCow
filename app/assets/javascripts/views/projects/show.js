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

	events: {
		"click .follow": "handleFollow"
	},

	handleFollow: function (event) {
		event.preventDefault();

		var idToFollow = $(event.currentTarget).data('id');
		var formData = {"follow[project_id]": idToFollow};

		$.ajax({
			url: 'api/follows',
			type: "POST",
			data: formData,
			dataType: "json",
			success: function(data) {
				this.render;
			}
		});
	},

	template: JST['projects/show'],

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
