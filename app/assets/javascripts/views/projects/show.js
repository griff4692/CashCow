CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.model = options.model;
		this.collection = options.collection;
		this.format = options.format;

		if (this.format === 'highlight') {
			this.catToHighlight = options.orderCategory;
		};

		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.followers(), "change", this.render);
		this.listenTo(this.model.backers(), "change", this.render);
	},

	tagName: 'li',

	events: {
		"click .follow": "handleFollow"
	},

	handleFollow: function (event) {
		event.preventDefault();

		var idToFollow = $(event.currentTarget).data('id');
		var formData = {"follow[project_id]": idToFollow};

		var that = this;

		$.ajax({
			url: 'api/follows',
			type: "POST",
			data: formData,
			dataType: "json",
			success: function(data) {
				that.model.followers().add(CashCow.currentUser);
				CashCow.currentUser.followedProjects.add(that.model)
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
