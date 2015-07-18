CashCow.Collections.Projects = Backbone.Collection.extend({
	url: '/api/projects',
	model: CashCow.Models.Project,

	groupedModelsArr: function (sortAttr) {
		return _.groupBy(this.models, function (model) {
			return model.get(sortAttr);
		});
	},

	// takes either none, or grouped value
	sortAndOrder: function (sortAttr, filter, direction) {
		var filtered;
		if (filter === 'All') {
			filtered = this.models;
		} else {
			filtered = this.groupedModelsArr('category')[filter];
		}

		if(sortAttr === 'none') {
			return filtered;
		}

		var sorted = _.sortBy(filtered, function (model) {
			return model.get(sortAttr)
		});

		if (direction==='asc') {
			return sorted;
		} else if (direction==='desc') {
			return sorted.reverse();
		} else {
			alert('didnt specify direction');
			return;
		}
	},

	primoBy: function (sortAttr, filter, direction) {
		var resultArr = this.sortAndOrder(sortAttr, filter, direction);

		if (resultArr.length === 0) { return -1 }

		return resultArr[0];
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
