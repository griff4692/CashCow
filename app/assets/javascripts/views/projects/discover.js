CashCow.Views.Discover = Backbone.CompositeView.extend({
  template: JST['projects/discover'],

  initialize: function (options) {
    this.collection = options.collection;
    this.projCategories = options.projCategories;
    this.orderCategories = options.orderCategories;
    this.currentCategory = options.currentCategory;
    this.currentOrder = options.order;

    this.$discoverToggle = this.$('.discover-toggle');
    this.$discoverResult = this.$('.discover-result');
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    "change .category-choice": "changeCategory",
    "change .order-choice": "changeOrder"
  },

  changeCategory: function (event) {
    this.currentCategory = $(event.currentTarget).val();
    this.render();
  },

  changeOrder: function (event) {
    this.currentOrder = $(event.currentTarget).val();
    this.render();
  },

  tagName: 'discover',

  render: function () {
    var that = this;

    that.resetSubviews();

    var content = this.template({
      projCategories: this.projCategories,
      orderCategories: this.orderCategories,
      currentCategory: this.currentCategory,
      currentOrder: this.currentOrder
    });

    this.$el.html(content);

    if (this.collection.models.length > 0) {
      this.collection.sortAndOrder(
        this.currentOrder,
        this.currentCategory,
        this.orderCategories[this.currentOrder][0]
      ).forEach(function (project) {
        var projDetailView = new CashCow.Views.ProjectShow({
          model: project,
          orderCategory: that.currentOrder,
          higlightTitle: that.orderCategories[that.currentOrder][1],
          collection: that.collection,
          format: 'thumbnail',
        });
        that.addSubview('.discover-result', projDetailView);
      });

      this.attachSubviews();
    }
    // not working
    // this.$('.thumbnail').removeClass('active')
    // this.$('.thumbnail').find(("[id=" + that.currentOrder + "]")).addClass('active');

    return this;
  }
})
