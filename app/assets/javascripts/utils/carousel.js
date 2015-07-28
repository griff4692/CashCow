CashCow.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.length = this.$el.find('.featured-projects').children().length;
  this.$prev = this.$el.find('.slide-right');
  this.$next = this.$el.find('.slide-left');
  this.bindHandlers();
  this.start();
  this.direction = 1;
};

CashCow.Carousel.prototype.bindHandlers = function() {
  // restart interval on click

  this.$prev.on('click', function(event){
    this.slide(1);
    clearInterval(this.carouselInterval);
    this.start();
  }.bind(this));

  this.$next.on('click', function(event) {
    this.slide(-1);
    clearInterval(this.carouselInterval);
    this.start();
  }.bind(this));
};

CashCow.Carousel.prototype.start = function () {
  var that = this;

  this.carouselInterval = setInterval(function () {
    if (that.activeIdx === that.length - 1) {
      that.direction = -1;
    } else if (that.activeIdx === 0) {
      that.direction = 1;
    }
    that.slide(that.direction)
  }, 5000);
};

CashCow.Carousel.prototype.slide = function (dir) {
  var newAbsIndex = this.activeIdx + dir;
  this.activeIdx = ((newAbsIndex + this.length) % this.length);
  var margin = this.activeIdx * (-960);
  this.$el.find('.featured-projects').css({'margin-left': margin});
}

$.fn.carousel = function () {
  return this.each(function () {
    new CashCow.Carousel(this);
  });
};
