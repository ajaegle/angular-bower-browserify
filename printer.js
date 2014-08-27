var i = 0;
var max = 30;

module.exports = {
  print: function() {
    // console.log('i was: ' + i);
    // console.log('max is: ' + max);
    for(i -= 1; i++ < max;) {
      console.log(i);
    }
    max *= 1.1;
  }
}
