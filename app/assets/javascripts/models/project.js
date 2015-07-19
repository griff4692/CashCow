CashCow.Models.Project = Backbone.Model.extend({
	// additional attributes from JBUILDER
	// json.days_left project.days_left
	// json.amount_funded backings_info['total']
	// num_followers = followers_info['total']
	// num_backers = backings_info['total']

	urlRoot: '/api/projects',

	toJSON: function () {
		return { "project" : _.clone(this.attributes) }
	},

	fundedStatus: function () {
		return Math.floor(this.get('amount_funded') / this.get('goal') * 100);
	},

	blurb: function (len) {
		if (this.get('description').length <= len) {
			return this.get('description');
		} else {
			return this.get('description').slice(0, len) + "...";
		}
	},

	parse: function (resp) {
		if (resp.followers) {
			this.followers().set(resp.followers, { parse: true });
			delete resp.followers;
		}

		if (resp.backers_with_amounts && resp.backers_with_amounts.length > 0) {
			var toSet = [];
			var userAttributes;

			resp.backers_with_amounts.forEach(function (backer) {
				userAttributes = backer[0];
				userAttributes.amount = backer[1];
				userAttributes.fund_date = backer[2];
				toSet.push(userAttributes);
			})

			this.backers().set(toSet, { parse: true });

			delete resp.backers_with_amounts;
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
