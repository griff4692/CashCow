CashCow.Models.Project = Backbone.Model.extend({
	urlRoot: '/api/projects',

	toJSON: function () {
		return {"project" : _.clone(this.attributes) }
	},

	parse: function (resp) {
		if (resp.followers) {
			this.followers().set(resp.followers, { parse: true });
			delete resp.followers;
		}

		if (resp.backers) {
			this.backers().set(resp.backers, { parse: true });
			delete resp.backers;
		}

		return resp
	},

	followers: function () {
		 if (!this._followers) {
			 this._followers = new CashCow.Collections.Users([])
		 }
		 return this._followers;
	},

	// collection of backers
	backers: function () {
		 if (!this._backers) {
			 this._backers = new CashCow.Collections.Users([])
		 }

		 return this._backers;
	},
})
