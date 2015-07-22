CashCow.Collections.SearchResults = Backbone.Collection.extend({

	url: "/api/search",

	parse: function (resp) {
		if (resp.total_count) {
			this.total_count = resp.total_count;
		}
		return resp.results;
	},
	model: CashCow.Models.Project
});
