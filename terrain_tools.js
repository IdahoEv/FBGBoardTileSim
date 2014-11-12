var TerrainTools = (function () {

  var my = {},
      stacks;

  var terrain_data = {
    mountain: { 
      color: '#850',
      stack: {
        mountain: 20,
        lowland: 7,
        desert: 10,
        wetland: 2,
        ruins: 3,
      }
    }, 
    lowland: {
      color: '#33CC33',
      stack: {
        mountain: 5,
        lowland: 20,
        desert: 10,
        wetland: 7,
        ruins: 3,
      }
    },  
    desert: {
      color: '#FFCC66',
      stack: {
        mountain: 5,
        lowland: 5,
        desert: 20,
        wetland: 0,
        ruins: 3,
      }
    },  
    wetland: {
      color: '#09a',
      stack: {
        mountain: 5,
        lowland: 7,
        desert: 0,
        wetland: 10,
        ruins: 2,
      }
    },
    ruins: {
      color: '#555555',
      stack: {
        mountain: 3,
        lowland: 3,
        desert: 3,
        wetland: 2,
        ruins: 5,
      }
    }
  }

  my.getTerrainData = function() {
    return terrain_data;
  }
  my.getStacks = function() {
    this.buildStacks();
    return stacks;
  }
  my.getCombinedStack = function() {
    this.buildStacks();
    return ArrayTools.shuffle(combineStacks(stacks));    
  }
  my.getColor = function(terrainName){
    if(terrainName == undefined) {
      return 'white';
    }
    return terrain_data[terrainName]['color'];
  }


  my.buildStacks = function(){
    stacks = {};
    this.eachTerrain(function(terr1){
      stacks[terr1] = []; //new Array(Object.keys(terrain_data).length);
      this.eachTerrain(function(terr2){
        var num = $('[data-stack="'+terr1+'"][data-terrain="'+terr2+'"]').val() * 1;
        console.log("found", num, "for", terr1, terr2 );
        for( ii = 0; ii< num; ii++) {
          stacks[terr1].push(terr2);
        }
        ArrayTools.shuffle(stacks[terr1]);
      })
    })    
    return stacks;
  }

  my.eachTerrain = function(fun) {
    for (var terrain in terrain_data) {
      if (terrain_data.hasOwnProperty(terrain)) {
        fun.call(this, terrain);
      }
    }   
  }


  function combineStacks(separateStacks) {
    var combined = [];
    my.eachTerrain(function(terrain){
      combined.push.apply(combined, separateStacks[terrain]);
    })
    return combined;
  }

  return my;
}());

