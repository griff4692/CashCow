CashCow.Views.ProjectForm = Backbone.View.extend({
	template: JST["projects/new_form"],

	tagName: 'form',

	events: {
		"click button": "submit"
	},

	initialize: function (options) {
		this.modelErrors = [];
		this.$projErrors = options.$errors;
		this.listenTo(this.model, "sync", this.render);
		this.$errorEl = $('#proj-errors');
		this.$el.addClass('form');
	},

	renderErrors: function () {
		var $errorsList = $('<ul>');
		$errorsList.addClass('proj-errors');

		this.modelErrors.forEach(function (error) {
			var $newLi = $('<li>');
			$newLi.text(error);
			$errorsList.append($newLi);
		})

		this.$errorEl.html($errorsList);
	},

	render: function () {
		var content = this.template({
			model: this.model
		});

		this.$el.html(content);

		return this;
	},

	submit: function () {
		event.preventDefault();

		var that = this;

		var category =this.$('#category').val();
		var title =this.$('#title').val();
		var images = this.$('#image')[0].files[0];
		var description =this.$('#description').val();
		var deadline =this.$('#deadline').val();
		var goal =this.$('#goal').val();

		var formData = new FormData();
		formData.append("project[category]", category);
		formData.append("project[title]", title);
		formData.append("project[image]", image);
		formData.append("project[description]", description);
		formData.append("project[deadline]", deadline);
		formData.append("project[goal]", goal);

		this.model.saveFormData(formData, {
			success: function() {
				CashCow.currentUser.fetch();
				that.collection.add(that.model);
				Backbone.history.navigate('/#/projects/' + that.model.id, { trigger: true } );
			}
		});

		// 	error: function (model, error, options) {
		// 		that.modelErrors = error.responseJSON;
		// 		that.renderErrors();
		// 	}
		// })

	}
})
