var TerrainTools = (function () {

  var my = {},
      stacks;

  var terrain_data = {
    mountain: { 
      color: '#663300',
      stack: {
        mountain: 20,
        desert: 10,
        lowland: 7,
        ruins: 5,
        wetland: 0
      }
    }, 
    desert: {
      color: '#FFCC66',
      stack: {
        mountain: 10,
        desert: 20,
        lowland: 5,
        ruins: 7,
        wetland: 0
      }
    },  
    lowland: {
      color: '#33CC33',
      stack: {
        mountain: 5,
        desert: 10,
        lowland: 20,
        ruins: 5,
        wetland: 5
      }
    },  
    wetland: {
      color: '#009999',
      stack: {
        mountain: 5,
        desert: 0,
        lowland: 7,
        ruins: 2,
        wetland: 10
      }
    },
    ruins: {
      color: '#555555',
      stack: {
        mountain: 5,
        desert: 5,
        lowland: 5,
        ruins: 10,
        wetland: 0
      }
    }
  }

  my.getTerrainData = function() {
    return terrain_data;
  }
  my.getStacks = function() {
    return stacks;
  }
  my.getCombinedStack = function() {
    this.buildStacks();
    //return combineStacks(stacks);
    return ArrayTools.shuffle(combineStacks(stacks));    
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

