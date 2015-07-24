CashCow.Models.Project = Backbone.Model.extend({
	// additional attributes from JBUILDER
	// json.days_left project.days_left
	// json.amount_funded backings_info['total']
	// num_followers = followers_info['total']
	// num_backers = backings_info['total']

	urlRoot: '/api/projects',

	returnStatStr: function(category) {
		if (category==='days_left') {
			return this.escape(category);
		} else if (category==='funded_status') {
			return this.fundedStatus() + '%';
		} else if (category==='num_backers') {
			return this.numBackers().toLocaleString();
		} else if (category==='num_followers'){
			return this.numFollowers().toLocaleString() + " Likes";
		} else if (category==='amount_funded') {
			return '$' + (this.pledged()*100/100).toLocaleString();
		} else {
			return -1;
		}
	},

	saveFormData: function(formData, options){
		var method = this.isNew() ? "POST" : "PUT";
		var model = this;

		$.ajax({
			url: _.result(model, "url"),
			type: method,
			data: formData,
			processData: false,
			contentType: false,
			success: function(resp){
				model.set(model.parse(resp));
				model.trigger('sync', model, resp, options);
				options.success && options.success(model, resp, options);
			},
			error: function(resp){
				options.error && options.error(model, resp, options);
			}
		});
	},

	toJSON: function () {
		return { "project" : _.clone(this.attributes) }
	},

	numBackers: function () {
		return this.backers().length;
	},

	pledged: function () {
		var total = 0;
		this.backers().pluck('amount').forEach(function (amount) {
			total += amount;
		});

		return total;
	},

	numFollowers: function () {
		return this.followers().length;
	},

	fundedStatus: function () {
		return Math.floor(this.pledged() / this.get('goal') * 100);
	},

	hypoFundedStatus: function(number) {
		var newAmount = this.pledged() + number;
		return newAmount / this.get('goal');
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
				userAttributes.backing_id = backer[3];
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
