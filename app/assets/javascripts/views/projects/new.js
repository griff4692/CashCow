CashCow.Views.ProjectForm = Backbone.View.extend({
	template: JST["projects/new_form"],

	events: {
		"click button": "submit",
		"click .cat-modal": "openModal",
		"click .close-out": "closeModal"
	},

	initialize: function (options) {
    this.$formErrors = options.$formErrors;
		this.listenTo(this.model, "sync", this.render);
		this.projCategories = options.projCategories;
		this.selectedCat = this.projCategories[0];
	},

	render: function () {
		var content = this.template({
			model: this.model,
			selectedCat: this.selectedCat,
			projCategories: this.projCategories
		});

		this.$el.html(content);
		return this;
	},

	submit: function () {
		event.preventDefault();

		var that = this;

		// var category =this.$('#category').val();
		var title =this.$('#title').val();
		var image = this.$('#image')[0].files[0];
		var description =this.$('#description').val();
		var deadline =this.$('#deadline').val();
		var goal =this.$('#goal').val();

		var formData = new FormData();
		formData.append("project[category]", this.selectedProj);
		formData.append("project[title]", title);
		formData.append("project[image]", image);
		formData.append("project[description]", description);
		formData.append("project[deadline]", deadline);
		formData.append("project[goal]", goal);

		if (image===undefined) {
			that.renderFormErrors(["Must Have a Project Image"]);
			return;
		}

		this.model.saveFormData(formData, {
			success: function() {
				CashCow.currentUser.fetch();
				that.collection.add(that.model);
				Backbone.history.navigate('/#/projects/' + that.model.id, { trigger: true } );
			},
			error: function (model, error, options) {
				that.renderFormErrors(error.responseJSON);
			}
		});
	},

	renderFormErrors: function (errors) {
	  var $errorsList = $('<ul>');
	  $errorsList.addClass('proj-errors');
	  errors.forEach(function (error) {
			var $newLi = $('<li>');
			if(error.length <= 50) {
				$newLi.text(error);
			} else {
				$newLi.text(error.slice(0, 50) + '...');
			}

			$errorsList.append($newLi);
		});

	  this.$formErrors.html($errorsList);
	}
})
