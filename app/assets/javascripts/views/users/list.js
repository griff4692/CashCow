CashCow.Views.UserList = Backbone.CompositeView.extend({
	initialize: function(options) {
		this.tabs = {
		 "a": this.model,
		 "b": this.model.followers(),
		 "c": this.model.backers()
	 	};
		this.view = options.view;
		this.listenTo(this.model, "sync", this.render);

		this.offSet = 5;
		this.currentPage = 1;
		this.currentTabId = options.currentTabId;
	},

	template: JST['users/list'],

	events: {
		"click .prev": "prevPage",
		"click .next": "nextPage",
		"click .tab": "toggleTab"
	},

	toggleTab: function (event) {
		this.currentPage = 1;
		var id = $(event.currentTarget).data('id');
		this.currentTabId = id;
		this.view.currentTabId = id;
		this.render();
	},

	prevPage: function (event) {
		event.preventDefault();
		this.currentPage --;
		this.render();
	},

	nextPage: function (event) {
		event.preventDefault();
		this.currentPage ++;
		this.render();
	},

	render: function () {
		var content;
		var users;
		var totalPages;

		if(this.currentTabId === 'a') {
			subject = this.tabs[this.currentTabId].get('description');
			totalPages = 0;
		} else {
			subject = this.tabs[this.currentTabId].page(this.currentPage, this.offSet);
			totalPages = this.tabs[this.currentTabId].totalPages(this.offSet);
		}

		var content = this.template({
			subject: subject,
			model: this.model,
			currentPage: this.currentPage,
			currentTabId: this.currentTabId,
			offSet: this.offSet,
			totalPages: totalPages
		});

		this.$el.html(content);
		this.$el.addClass('detail-content');
		return this;
	}



});
