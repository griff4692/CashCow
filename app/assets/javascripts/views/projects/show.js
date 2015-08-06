CashCow.Views.ProjectShow = Backbone.CompositeView.extend({
	initialize: function (options) {
		this.resetSubviews();

		if(this.model.get('user_id') === CashCow.currentUser.id) {
			this.creator = CashCow.currentUser;
		} else {
			this.creator = CashCow.Collections.users.getOrFetch(this.model.get('user_id'));
		}

		this.listenTo(this.creator, "sync", this.render);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(CashCow.currentUser.followedProjects, "sync change", this.render);

		this.collection = options.collection;
		this.format = options.format;
		this.catToHighlight = "";
		this.highlightTitle = "";

		if (this.format === 'highlight' || this.format=== 'thumbnail') {
			this.catToHighlight = options.orderCategory;
			this.highlightTitle = options.highlightTitle;
		};
		this.currentTabId = 'a';
		this.generateUserList();

		if(options.stats && options.stats === 'none') {
			this.showStats = false;
		} else {
			this.showStats = true;
		}
		this.justUnfunded = false;
	},

	tagName: 'li',

	generateUserList: function () {
		if (this.format!=='detail') {
			return;
		}
		var userList = new CashCow.Views.UserList({
			model: this.model,
			currentTabId: this.currentTabId,
			view: this
		});

		this.addSubview('.tabs', userList);
	},

	events: {
		"click .like-me": "handleFollow",
		"click .unlike-me":"handleFollow",
		"click #project-picture": "visitProj",
		"click #unfund": "unfund"
	},

	unfund: function (event) {
		event.preventDefault();
		var backer = this.model.backers().findWhere({id: CashCow.currentUser.id});
		var backingId = backer.get('backing_id');
		var that = this;

		$.ajax({
			url: 'api/backings/' + backingId,
			type: 'delete',
			dataType: "json",
			success: function(data) {
				alert("successfully removed your funding!");
				that.model.backers().remove(backer);
				CashCow.currentUser.backedProjects().remove(that.model);
				that.render();
				that.justUnfunded = true;
			}
		});
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
				that.resetSubviews();
				that.generateUserList();
				that.render();
			};
		} else {
			action = 'delete';
			url = 'api/follows/' + CashCow.currentUser.id;
			callback = function () {
				that.model.followers().remove(CashCow.currentUser);
				CashCow.currentUser.followedProjects().remove(that.model);
				that.resetSubviews();
				that.generateUserList();
				that.render();
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
			higlightTitle: this.highlightTitle,
			showStats: this.showStats,
			justUnfunded: this.justUnfunded
		});

		this.$el.html(content);
    this.attachSubviews();

		return this;
	}

})
