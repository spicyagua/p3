P3.Foobaloo = function(x,y) {
  this.x = x;
  this.y = y;
};

P3.Foobaloo.prototype = {
  getSum: function() {
    return this.x + this.y;
  },
  doubleYourself: function() {
    this.x = this.x*2;
    this.y = this.y*2;
  }
};