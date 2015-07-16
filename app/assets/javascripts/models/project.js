CashCow.Models.Project = Backbone.Model.extend({
	urlRoot: '/api/projects',

	toJSON: function () {
		return {"project" : _.clone(this.attributes) }
	}
})
