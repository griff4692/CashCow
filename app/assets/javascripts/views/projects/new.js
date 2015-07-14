CashCow.Views.ProjectForm = Backbone.View.extend({
	template: JST["projects/form"],

	tagName: 'form',

	events: {
		"click button": "submit"
	},

	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.modelErrors, "add remove", this.renderErrors);
		this.$error$el = $('#proj-errors');
		this.modelErrors = [];
	},

	renderErrors: function () {
		var $errorsList = $('<ul>');
		$errorsList.addClass('proj-errors');

		this.modelErrors.forEach(function (error) {
			var $newLi = $('<li>');
			$newLi.text(error);
			$errorsList.append($newLi);
		})

		this.$error$el.html($errorsList);
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
				that.$error$el.empty();
				Backbone.history.navigate('', { trigger: true } );
			},

			error: function (model, error, options) {
				debugger;
				that.modelErrors = error.responseJSON;
				that.renderErrors();
			}
		})

	}
})
