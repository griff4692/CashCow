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
    "click .cat-modal": "openModal",
    "click .close-out": "closeModal",
    "click .category": "changeCategory",
    "click .order": "changeOrder"
  },

  changeCategory: function (event) {
    this.currentCategory = $(event.currentTarget).data('value');
    this.render({modal: 'open'});
    this.render({modal: 'open'})
  },

  changeOrder: function (event) {
    this.currentOrder = $(event.currentTarget).data('value');
    $(event.currentTarget).addClass('selected');
    this.render({modal: 'open'});
  },

  openModal: function (event) {
    event.preventDefault();
    this.render({modal: 'open'});
    return;
  },

  closeModal: function (event) {
    this.render({modal: 'close'});
    return
  },

  tagName: 'discover',

  render: function (options) {
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

    if (options && options.modal && options.modal === 'open') {
      this.$('.modal').addClass('is-open');
    }

    if (options && options.modal && options.modal === 'close') {
      this.$('.modal').removeClass('is-open');
    }


    return this;
  }
})
