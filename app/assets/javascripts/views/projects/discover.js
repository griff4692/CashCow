CashCow.Views.Discover = Backbone.CompositeView.extend({
  template: JST['projects/discover'],

  initialize: function (options) {
    this.collection = options.collection;
    this.projCategories = options.projCategories;
    this.orderCategories = options.orderCategories;
    this.currentCategory = options.currentCategory;
    this.currentOrder = options.order;
    this.modalCategory = null;

    this.$discoverToggle = this.$('.discover-toggle');
    this.$discoverResult = this.$('.discover-result');
    this.listenTo(this.collection, "sync", this.render);

    this.currentPage = 1;
    this.offSet = 6;
    this.bookEnd = this.offSet;
  },

  events: {
    "click .cat-modal": "openModal",
    "click .close-out": "closeModal",
    "click .category": "changeCategory",
    "click .order": "changeOrder",
    "click .show-more": "showMore",
    "click .show-less": "showLess"
  },

  showMore: function (event) {
    event.preventDefault();
    this.bookEnd += this.offSet;
    this.render();
  },

  showLess: function (event) {
    event.preventDefault();
    this.bookEnd -= this.offSet;
    this.render();
  },

  changeCategory: function (event) {
    this.$currentCategory && this.$currentCategory.removeClass('selected');
    this.$currentCategory = $(event.currentTarget);
    this.$currentCategory.addClass('selected');
    this.currentCategory = this.$currentCategory.data('value');

    this.modalCategory = "filled";

    if (this.modalOrder === 'filled') {
      this.$('.close-out').addClass('ready');
    };
  },

  changeOrder: function (event) {
    this.$currentOrder && this.$currentOrder.removeClass('selected');
    this.$currentOrder = $(event.currentTarget);
    this.$currentOrder.addClass('selected');
    this.currentOrder = this.$currentOrder.data('value');

    this.modalOrder = "filled";

    if (this.modalCategory === 'filled') {
      this.$('.close-out').addClass('ready')
    };
  },

  openModal: function (event) {
    event.preventDefault();
    this.render({modal: 'open'});
    return;
  },

  closeModal: function (event) {
    this.render({modal: 'close'});
    this.$('.close-out').removeClass('ready');
    this.modalOrder = null;
    this.modalCategory = null;
  },

  tagName: 'discover',

  render: function (options) {
    var that = this;

    that.resetSubviews();

    var collection = [];

    if (this.collection.models.length > 0) {
      collection = this.collection.sortAndOrder(
        this.currentOrder,
        this.currentCategory,
        this.orderCategories[this.currentOrder][0]
      )
    };

    var content = this.template({
      projCategories: this.projCategories,
      orderCategories: this.orderCategories,
      currentCategory: this.currentCategory,
      currentOrder: this.currentOrder,
      length: collection.length,
      offSet: this.offSet,
      bookEnd: this.bookEnd
    });

    this.$el.html(content);

    collection.slice(0, this.bookEnd).forEach(function (project) {
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

    if (options && options.modal && options.modal === 'open') {
      this.$('.modal').addClass('is-open');
    }

    if (options && options.modal && options.modal === 'close') {
      this.$('.modal').removeClass('is-open');
    }

    return this;
  }
})
