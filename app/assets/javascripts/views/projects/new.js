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
		var formData = this.$el.serializeJSON();

		this.model.set(formData);

		var that = this;

		this.model.save({}, {
			success: function () {
				that.collection.add(that.model, { merge: true} );
				that.$errorEl.empty();
				Backbone.history.navigate('', { trigger: true } );
			},

			error: function (model, error, options) {
				that.modelErrors = error.responseJSON;
				that.renderErrors();
			}
		})

	}
})
