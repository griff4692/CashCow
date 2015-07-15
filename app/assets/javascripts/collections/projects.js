CashCow.Collections.Projects = Backbone.Collection.extend({
	url: '/api/projects',
	model: CashCow.Models.Project,

	groupedModelsArr: function () {
		return _.groupBy(this.models, function (model) {
			return model.get('category');
		});
	},

	// takes either none, or grouped value
	myOrderBy: function (rankFlavor, filterByCategory) {
		var toSort;

		if (filterByCategory === 'none') {
			toSort = this.models;
		} else {
			toSort = this.groupedModelsArr()['filterByCategory'];
		}

		return _.sortBy(toSort, function (model) {
			return model.get(rankFlavor)
		})
	},

	primoBy: function (rankFlavor, filterByCategory, direction) {
		var primo = -1;

		if (filterByCategory === 'none' ||
		 		(this.groupedModelsArr['filterByCategory'] &&
					this.groupedModelsArr['filterByCategory'].length > 0))
		{
			var orderedList = this.myOrderBy(rankFlavor, filterByCategory);
			if (direction==='asc') {
				primo = orderedList[0];
			} else {
				primo = orderedList[orderedList.length - 1]
			}
		}
		return primo;
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
