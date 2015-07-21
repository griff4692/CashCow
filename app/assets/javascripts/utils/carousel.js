CashCow.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.length = this.$el.find('.featured-projects').children().length;
  this.$prev = this.$el.find('.slide-right');
  this.$next = this.$el.find('.slide-left');
  this.bindHandlers();

  this.direction = 1;

  var that = this;

  setInterval(function () {
    if (that.activeIdx === that.length - 1) {
      that.direction = -1;
    } else if (that.activeId === 0) {
      that.direction = 1;
    }
    that.slide(that.direction)
    } ,4000);
};

CashCow.Carousel.prototype.bindHandlers = function() {
  this.$prev.on('click', function(event){
    this.slide(1)}.bind(this));

  this.$next.on('click', function(event){
    this.slide(-1)}.bind(this));
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
