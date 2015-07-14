CashCow.Collections.Projects = Backbone.Collection.extend({
	url: '/api/projects',
	model: CashCow.Models.Project,

	filterBy: function (category) {},

	orderBy: function (category) {},

	primo: function (category) {
		this.models ? this.models[0] : -1;
	},

	getOrFetch: function (id) {
		var project = this.get(id);
		var that = this;

		if (project) {
			project.fetch()
		} else {
			project = new CashCow.Models.Project ( { id: id } );
			project.fetch({
				success: function () {
					that.add(project)
				}
			})
		}
		return project;
	}
})
