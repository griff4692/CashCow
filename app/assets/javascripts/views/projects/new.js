CashCow.Views.ProjectForm = Backbone.View.extend({
	template: JST["projects/new_form"],

	events: {
		"click button": "submit",
		"click .proj-cat-modal": "openModal",
		"click .close-out": "closeModal",
		"click .category": "changeCategory",
		"change #title": "openForm"
	},

	openForm: function (event) {
		event.preventDefault();
		this.$('.main-form').addClass('reveal');
	},

	openModal: function (event) {
		event.preventDefault();
    this.render({modal: 'open'});
    return;
	},

	closeModal: function(event) {
		event.preventDefault();
		this.render({modal: 'close'});
		this.$('.close-out').removeClass('ready');
		this.modalOrder = null;
		this.modalCategory = null;
	},

	initialize: function (options) {
    this.$formErrors = options.$formErrors;
		this.listenTo(this.model, "sync", this.render);
		this.projCategories = options.projCategories;
		this.currentCategory = this.projCategories[0];
	},

	changeCategory: function (event) {
		event.preventDefault();
		this.$currentCategory && this.$currentCategory.removeClass('selected');
		this.$currentCategory = $(event.currentTarget);
		this.$currentCategory.addClass('selected');
		this.currentCategory = this.$currentCategory.data('value');
		this.$('.close-out').addClass('ready');
	},

	render: function (options) {
		var content = this.template({
			model: this.model,
			currentCategory: this.currentCategory,
			projCategories: this.projCategories
		});

		this.$el.html(content);

		if (options && options.modal && options.modal === 'open') {
			this.$('.modal').addClass('is-open');
		}

		if (options && options.modal && options.modal === 'close') {
			this.$('.modal').removeClass('is-open');
		}

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
		formData.append("project[category]", this.currentCategory);
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
