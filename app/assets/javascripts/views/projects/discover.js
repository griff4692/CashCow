CashCow.Views.Discover = Backbone.CompositeView.extend({
  template: JST['projects/discover'],

  initialize: function (options) {
    this.collection = options.collection;
    this.projCategories = options.projCategories;
    this.orderCategories = options.orderCategories;
    this.currentCategory = options.currentCategory;
    this.order = options.order;

    this.listenTo(this.collection, "sync", this.render)
  },

  tagName: 'discover',

  render: function () {
    var content = this.template({
      projCategories: this.projCategories,
      orderCategories: this.orderCategories,
      currentCategory: this.currentCategory,
      order: this.order
    });
    this.$el.html(content);

    // generate appropriate subview below

    this.attachSubviews();

    return this;
  }
})
