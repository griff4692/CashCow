CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.model = options.model;
		this.creator = CashCow.Collections.users.getOrFetch(this.model.get('user_id'));
		this.collection = options.collection;
		this.format = options.format;
		this.catToHighlight = "";
		this.highlightTitle = "";

		var model = this.model;

		if (this.format === 'highlight' || this.format=== 'thumbnail') {
			this.catToHighlight = options.orderCategory;
			this.highlightTitle = options.highlightTitle;
		};

		this.listenTo(this.model, "sync", this.check);
		this.listenTo(this.creator, "sync", this.render);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.followers(), "change add remove", this.render);
		this.listenTo(this.model.backers(), "change add remove", this.render);

		this.tabs = {
			"a": this.model,
			"b": this.model.followers(),
			"c": this.model.backers()
		};

		this.currentTabId = 'a';
		this.currentPage = 1;
		this.offSet = 3;
	},

	tagName: 'li',

	events: {
		"click .like-me": "handleFollow",
		"click .unlike-me":"handleFollow",
		"click #project-picture": "visitProj",
		"click .tab": "toggleTab"
	},

	toggleTab: function (event) {
		this.currentPage = 1;
    var id = $(event.currentTarget).data('id');
    this.currentTabId = id;
    this.render();
	},

	visitProj: function () {
		Backbone.history.navigate('projects/' + this.model.id, { trigger: true } );
	},

	handleFollow: function (event) {
		event.preventDefault();

		var that = this;

		var action;
		var url;
		var callback;
		var formData = {"follow[project_id]": this.model.id}

		if ($(event.currentTarget).data('type') === 'like') {
			action = "post";
			url = 'api/follows';
		  callback = function () {
				that.model.followers().add(CashCow.currentUser);
				CashCow.currentUser.followedProjects().add(that.model);
				that.render();
			}
		} else {
			action = 'delete';
			url = 'api/follows/' + CashCow.currentUser.id;
			callback = function () {
				that.model.followers().remove(CashCow.currentUser);
				CashCow.currentUser.followedProjects().remove(that.model);
				that.render()
			}
		}

		$.ajax({
			url: url,
			type: action,
			data: formData,
			dataType: "json",
			success: function(data) {
				callback(data);
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

		if (this.format==='detail') {
			this.resetSubviews();
			var userList = new CashCow.Views.UserList({
				currentTab: this.tabs[this.currentTabId],
				currentPage: this.currentPage,
				offSet: this.offSet,
				currentTabId: this.currentTabId
			});

			this.addSubview('.tab-content', userList);
		};

    this.attachSubviews();

		return this;
	}

})
