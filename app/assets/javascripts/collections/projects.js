CashCow.Collections.Projects = Backbone.Model.extend({
	url: '/api/projects',
	model: CashCow.Models.Project,

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
