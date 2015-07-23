CashCow.Views.BackingForm = Backbone.CompositeView.extend({
	template: JST["projects/backing_form"],

  events: {
    "submit form": "submitBack",
		"change #hypo": "showProgress"
  },

	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
		this.hypothetical = 0;
	},

	showProgress: function (event) {
		event.preventDefault();
		this.hypothetical = $(event.currentTarget).val();
		this.render();
	},

  render: function () {
    var content = this.template({
      model: this.model,
			hypothetical: this.hypothetical
    });

    this.$el.html(content);
    return this;
  },

  submitBack: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON().backing;
		data.project_id = this.model.id

		data = { 'backing' : data };

		var that = this;

		$.ajax({
			url: 'api/backings',
			type: "POST",
			data: data,
			dataType: "json",
			success: function(data) {
				var newBacker = new CashCow.Models.Backer(CashCow.currentUser.attributes);
				var newBacked = new CashCow.Models.Project(that.model.attributes);
				newBacker.set('amount', data.amount);
				newBacker.set('fund_date', data.fund_date);
				newBacked.set('amount', data.amount);
				newBacked.set('fund_date', data.fund_date);

				that.model.backers().add(newBacker);
				CashCow.currentUser.backedProjects().add(newBacked);
				Backbone.history.navigate('#/projects/' + that.model.id, { trigger: true } );
			}
		});
  }

})
