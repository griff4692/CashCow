CashCow.Models.Project = Backbone.Model.extend({
	urlRoot: '/api/projects',

	toJSON: function () {
		return {"project" : this.attributes }
	}
})
