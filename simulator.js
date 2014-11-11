var ROWS = 14;
var COLS = 20;
var SIZE = 20;

var grid = new HexagonGrid("HexCanvas", SIZE);
//var terrains = ['mountain', 'desert', 'lowland', 'wetland', 'ruins' ];
var terrain_data = {
  mountain: { 
    color: '#663300',
    stack: {
      mountain: 50,
      desert: 25,
      lowland: 20,
      ruins: 10,
      wetland: 0
    }
  }, 
  desert: {
    color: '#FFCC66',
    stack: {
      mountain: 25,
      desert: 50,
      lowland: 10,
      ruins: 15,
      wetland: 0
    }
  },  
  lowland: {
    color: '#33CC33',
    stack: {
      mountain: 50,
      desert: 25,
      lowland: 50,
      ruins: 25,
      wetland: 10
    }
  },  
  wetland: {
    color: '#009999',
    stack: {
      mountain: 50,
      desert: 25,
      lowland: 20,
      ruins: 10,
      wetland: 10
    }
  },
  ruins: {
    color: '#555555',
    stack: {
      mountain: 5,
      desert: 5,
      lowland: 5,
      ruins: 15,
      wetland: 0
    }
  }
}
grid.drawHexGrid(ROWS, COLS, SIZE, SIZE, true);




var row = ROWS/2;
var col = COLS/2;
console.log("starting from", col, row);
var board = createArray(COLS,ROWS);

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

populateTableWithDefaults();
//randomFill();

function populateTableWithDefaults() {
  for(var terr in terrain_data) {
    for(var terr2 in terrain_data[terr]['stack']) {
      $('[data-stack="'+terr+'"][data-terrain="'+terr2+'"]').val(terrain_data[terr]['stack'][terr2]); 
    }
  }
}

function randomFill() {
  var random_tiles = []
  for(ii = 0; ii < 50; ii++){
    random_tiles.push('mountain');
  }
  for(ii = 0; ii < 75; ii++){
    random_tiles.push('desert');
  }
  for(ii = 0; ii < 40; ii++){
    random_tiles.push('lowland');
  }
  for(ii = 0; ii < 20; ii++){
    random_tiles.push('wetland');
  }
  shuffle(random_tiles);
  var STEPS = 400;
  board[col][row] = random_tiles.pop();
  grid.drawHexAtColRow(col,row,terrain_data[board[col][row]].color);
  // Random-walk the board, inserting a tile wherever there isn't one
  for (ii=0; ii < STEPS; ii++) {
    console.log(ii, col, row);

    if (col % 2 == 0) {
      var deltas = evenColDeltas;
    } else {
      var deltas = oddColDeltas;      
    }
    for (jj=0; jj < 6; jj++){
      del = deltas[jj];
      var rx = row+del[1];
      var cx = col+del[0];
      if (!outOfRange(cx,rx) && (board[cx][rx] == undefined)){
        board[cx][rx] = random_tiles.pop();
        grid.drawHexAtColRow(cx,rx,terrain_data[board[cx][rx]].color);
      }
    }
    new_coords = randomStep(col, row);  
    col = new_coords[0];
    row = new_coords[1];
  }
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

function shuffle(array) {
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
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
