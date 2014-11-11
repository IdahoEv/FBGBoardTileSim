var GridTools = (function () {
  var my = {},
    ROWS = 14, 
    COLS = 20,
    SIZE = 20,
    grid;

  var oddColDeltas = [
    [0,-1],
    [1,0],
    [1,1],
    [0,1],
    [-1, 1],
    [-1,0]
  ];
  var evenColDeltas = [
    [0,-1],
    [1,-1],
    [1,0],
    [0,1],
    [-1, 0],
    [-1,-1]
  ];

  my.init = function() {
    grid = new HexagonGrid("HexCanvas", SIZE);    
  }

  function randomStep(start_col, start_row) {
    var rx, cx;
    do {
      if (start_col % 2 == 1) {
        //console.log("odd column", start_col);
        delta = oddColDeltas[getRandomInt(0,5)*1];
      } else {
        //console.log("even column", start_col);
        delta = evenColDeltas[getRandomInt(0,5)*1];
      }
      cx = start_col + delta[0];
      rx = start_row + delta[1];
      console.log(delta, start_col, "->", cx, start_row, "->", rx);
    } while(outOfRange(cx, rx) || sameCoords(rx,cx,start_row, start_col));
    return [cx, rx];
  }

  function outOfRange(col, row){
    return (row < 0 || col < 0 || row >= ROWS || col >= COLS)
  }

  function sameCoords(r1, c1, r2, c2) {
    return (r1 == r2 && c1 == c2)
  }
  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  return my;

}());
