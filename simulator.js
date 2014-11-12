var Simulator = (function() {

  var my = {},
      board;

  function bindUX() {
    $('#random_terrain').click(function(evt) { 
      evt.preventDefault();
      my.exploreRandom();
    });
    $('#stack_terrain').click(function(evt) { 
      evt.preventDefault();
      my.exploreStacked();
    });
    $('input').change(function(evt){
      console.log('change triggered');
      my.computeTotals();
    })
  }


  function clear() {
    board = ArrayTools.createArray(GridTools.getCols(), GridTools.getRows());
  }

  my.populateTableWithDefaults = function(){
    terrain_data = TerrainTools.getTerrainData();
    for(var terr in terrain_data) {
      for(var terr2 in terrain_data[terr]['stack']) {
        $('[data-stack="'+terr+'"][data-terrain="'+terr2+'"]').val(terrain_data[terr]['stack'][terr2]); 
      }
    }
    my.computeTotals();
  }

  my.computeTotals = function() {
    bigsum = 0;
    TerrainTools.eachTerrain(function(terr){
      sum = 0;
      $('input[data-terrain="'+terr+'"').each(function(idx, elem){      
        sum = sum + $(elem).val() * 1;
      });
      $('td[data-terrain="'+terr+'"').html(sum);
      bigsum += sum;
    });
    $('td[data-total]').html(bigsum);
  }

  my.init = function() {
    console.log('initializing simulator');
    my.populateTableWithDefaults();
    GridTools.init();
    bindUX();
  }

 
  my.exploreRandom = function() {
    console.log('explore random');
    clear();
    GridTools.init();
    GridTools.walkTheBoard(
      TerrainTools.getCombinedStack(),
      this.setRandomTile,
      this.tilesAreEmpty     
    )
  }
  my.exploreStacked = function() {
    console.log('explore stacked');
    clear();
    sc = GridTools.getCols()/2;
    sr = GridTools.getRows()/2;
    board[sc][sr] = 'desert'; 
    GridTools.init();
    GridTools.drawTerrain(board[sc][sr], sc, sr);
    GridTools.walkTheBoard(
      TerrainTools.getStacks(),
      this.setStackTile,
      this.stacksAreEmpty     
    )
  }

  
  my.setRandomTile = function(tiles, cx, rx, _col, _row) {
    if (my.tilesAreEmpty(tiles)) {
      return;
    }
    if (board[cx][rx] == undefined) {
      board[cx][rx] = tiles.pop(); 
    }
    GridTools.drawTerrain(board[cx][rx], cx, rx);
  }
  my.setStackTile = function(tiles, cx, rx, col, row) {
    if (my.stacksAreEmpty(tiles)) {
      return;
    }
    currentTerrain = board[col][row];
    console.log("Current terrain", currentTerrain, col, row);
    if (board[cx][rx] == undefined) {
      if (tiles[currentTerrain].length > 0) {
        board[cx][rx] = tiles[currentTerrain].pop(currentTerrain); 
      } else {
        board[cx][rx] = getTileFromAnyStack(tiles);
      }
      GridTools.drawTerrain(board[cx][rx], cx, rx);
    }
  }

  function getTileFromAnyStack(tiles) {    
    stackNames = ArrayTools.shuffle(['mountain', 'lowland', 'desert', 'ruins', 'wetland']);
    for(ii = 0; ii < stackNames.length; ii++) {
      if(tiles[stackNames[ii]].length > 0) {
        return tiles[stackNames[ii]].pop();
      }
    }
  }
  function tilesInStack(tiles) {
    tiles['mountain'].length +
      tiles['lowland'].length +
      tiles['desert'].length +
      tiles['ruins'].length +
      tiles['wetland'].length; 
  }
 
  my.tilesAreEmpty = function(tiles) {
    //console.log(tiles.length, "remaining tiles");
    return (tiles.length < 1);
  }
  my.stacksAreEmpty = function(tiles) {
    //console.log(tilesInStack(tiles), "remaining tiles in stacks");
    return tilesInStack(tiles) < 1;
  }

  return my;
}());
