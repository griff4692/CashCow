CashCow.Views.UserList = Backbone.CompositeView.extend({
	initialize: function(options) {
		this.currentTab = options.currentTab;
		this.currentPage = options.currentPage;
		this.offSet = options.offSet;
		this.currentTabId = options.currentTabId;
	},

	template: JST['users/list'],

	render: function () {
		var content;

		if(this.currentTabId === 'a') {
			content = this.currentTab.get('description');
		} else {
			var users = this.currentTab.page(this.currentPage, this.offSet);
			var content = this.template({
				users: users,
				currentPage: this.currentPage,
				currentTabId: this.currentTabId,
				totalPages: this.currentTab.totalPages(this.offSet)
			});
		}

		this.$el.html(content);
		this.$el.addClass('detail-content');
		return this;
	}



});
