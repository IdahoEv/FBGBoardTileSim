var ArrayTools = (function() {
  var my = {};

  my.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  my.createArray = function (length) {
      var arr = new Array(length || 0),
          i = length;

      if (arguments.length > 1) {
          var args = Array.prototype.slice.call(arguments, 1);
          while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
      }

      return arr;
  }
  return my;
}());
