P3.app = (function() {
  var _init = function() {
    var myFoobaloo = new P3.Foobaloo(1,2);
    console.log("Myfoobaloo sum: " + myFoobaloo.getSum());
    myFoobaloo.doubleYourself();
    console.log("Myfoobaloo sum: " + myFoobaloo.getSum());
  };
  return {
    init: _init
  };
}());