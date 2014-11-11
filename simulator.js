var Simulator = (function() {

  var my = {},
      board;

  function bindUX() {
    
  }


  my.populateTableWithDefaults = function(){
    terrain_data = TerrainTools.getTerrainData();
    for(var terr in terrain_data) {
      for(var terr2 in terrain_data[terr]['stack']) {
        $('[data-stack="'+terr+'"][data-terrain="'+terr2+'"]').val(terrain_data[terr]['stack'][terr2]); 
      }
    }
  }

  my.init = function() {
    console.log('initializing simulator');
    my.populateTableWithDefaults();
    GridTools.init();
  }

  // tileSelector is a function to that takes two arguments:
  //   terrain:  the terrain of the current tile
  //   stack: the source of tiles to pull from
  my.walkTheBoard = function(tileSelector) {

  }

  return my;
}());
