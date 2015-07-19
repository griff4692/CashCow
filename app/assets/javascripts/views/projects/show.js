CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.model = options.model;
		this.creator = CashCow.Collections.users.getOrFetch(this.model.get('user_id'));
		this.collection = options.collection;
		this.format = options.format;
		this.catToHighlight = "";
		this.highlightTitle = "";

		if (this.format === 'highlight' || this.format=== 'thumbnail') {
			this.catToHighlight = options.orderCategory;
			this.highlightTitle = options.highlightTitle;
		};

		this.listenTo(this.model, "sync", this.check);
		this.listenTo(this.creator, "sync", this.render);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.followers(), "change", this.render);
		this.listenTo(this.model.backers(), "change", this.render);
	},

	tagName: 'li',

	events: {
		"click .follow": "handleFollow",
		"click .thumbnail": "visitProj"
	},

	visitProj: function () {
		Backbone.history.navigate('projects/' + this.model.id, { trigger: true } );
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

	template: function (options) {
		if (this.format === 'highlight') {
			return JST['projects/highlight'](options);
		} else if (this.format === 'thumbnail') {
			return JST['projects/thumbnail'](options);
		} else {
			return JST['projects/detail'](options);
		}
	},

	render: function () {
		var content = this.template({
			model: this.model,
			creator: this.creator,
			type: this.format,
			catToHighlight: this.catToHighlight,
			higlightTitle: this.highlightTitle
		});

		this.$el.html(content);
		return this;
	}

})
