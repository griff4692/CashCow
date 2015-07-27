CashCow.Views.Search = Backbone.View.extend({

	initialize: function (options) {
		this.projects = options.projects;
		this.searchResults = [];
		this.query = '';
		// this.$('.search-results').addClass('hidden');
		this.listenTo(this.projects, "sync", this.search);
		this.render();
	},

	events: {
		"input #query": "search",
	},

	template: JST['shared/search'],

	search: function () {
    var that = this;

		setTimeout(function () {
			that.query = that.$("#query").val();
			if(that.query==='') {
				that.searchResults = [];
				if(! $('.search-results').hasClass('hidden')) {
					$('.search-results').addClass('hidden');
				}
				return;
			}

			that.searchResults = that.projects.searchResults(that.query);
			if (that.$('.search-results').hasClass('hidden')) {
				that.$('.search-results').removeClass('hidden');
			}

			that.render();
		}, 2500);
	},

	render: function () {
		var content = this.template({
			results: this.searchResults,
			query: this.query
		});

		this.$el.html(content);

		return this;
	}
});
