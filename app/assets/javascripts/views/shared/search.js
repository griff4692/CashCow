CashCow.Views.Search = Backbone.View.extend({

	initialize: function () {
		this.searchResults = new CashCow.Collections.SearchResults();
		this.listenTo(this.searchResults, "sync", this.render);
		this.render();
	},

	events: {
		"change #query": "search",
		"active #query": "search",
	},

	template: JST['shared/search'],

	render: function () {
		var content = this.template({
			results: this.searchResults
		});
		this.$el.html(content);

		return this;
	},

	search: function (event) {
		event.preventDefault();
    this.searchResults.query = this.$("#query").val();

		this.searchResults.fetch({
			data: {
				query: this.searchResults.query
			}
		});
	}
});
