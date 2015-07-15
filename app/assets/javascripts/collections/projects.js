CashCow.Collections.Projects = Backbone.Collection.extend({
	url: '/api/projects',
	model: CashCow.Models.Project,

	groupedModelsArr: function (sortAttr) {
		return _.groupBy(this.models, function (model) {
			return model.get('sortAttr');
		});
	},

	// takes either none, or grouped value
	sortAndOrder: function (sortAttr, filter) {
		var filtered;

		if (filter === 'All') {
			filtered = this.models;
		} else {
			filtered = this.groupedModelsArr()['filter'];
		}

		if(sortAttr === 'none') {
			return filtered;
		}

		return _.sortBy(filtered, function (model) {
			return model.get(sortAttr)
		})
	},

	primoBy: function (sortAttr, filter, direction) {
		var primoIndex;
		var resultArr = this.sortAndOrder(sortAttr, filter);

		if (resultArr.length === 0) {
			return -1;
		}

		if (direction==='asc') {
			primoIndex = 0;
		} else {
			primoIndex = orderedList.length - 1;
		}

		return resultArr[primoIndex];
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
