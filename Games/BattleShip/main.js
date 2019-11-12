(function () {
  var game_global = {
    gridEl: document.getElementById('bs-game'),
    boxwidth: 32,
    boxheigth: 32,
    rows: 10,
    columns: 10,
    grid: []
  }

  var stats = [];

  var destroyed = [];

  function Random() {
    return Math.floor(Math.random()*game_global.rows);
  }

  var ships = [4,3,3,2,2,2,1,1,1,1];

  function Grid() {
    for (var i = 0; i < game_global.rows; i++) {

      var gridx = [];
      game_global.grid.push(gridx);
      for (var j = 0; j < game_global.columns; j++) {
        game_global.grid[i].push(' ');
       }
    }

    this.Ships();
  }

  Grid.prototype.Ships = function() {
    for (var i = 0; i < ships.length; i++) {
      switch (ships[i]) {
          case 4:
            this.fourShip(i);
          break;
          case 3:
            this.threeShip(i);
          break;
          case 2:
            this.twoShip(i);
          break;
          case 1:
            this.oneShip(i);
          break;
        }
    }
  }

  Grid.prototype.fourShip = function(order) {
    var cooX = Random();
    var cooY = Random();

    var gridCoordinate = this.checkCoordinate(cooX, cooY, 4);


    if (gridCoordinate == false) {
      console.log("4 wrong");
      this.fourShip(order);
    } else {
      var d = this.directionToTake(cooX, cooY, 4);

      if(d) {
        var shipinfo = this.Populate(cooX,cooY,4,d, "Aircraft carrier " + order);

        stats.push(shipinfo);

        this.addBuffer(4);
      } else {
        game_global.grid[cooY][cooX] = " ";
        this.fourShip(order);
      }
    };
  }

  Grid.prototype.threeShip = function(order) {
    var cooX = Random();
    var cooY = Random();

    var gridCoordinate = this.checkCoordinate(cooX, cooY, 3);

    if (gridCoordinate == false) {
      console.log("3 wrong");
      this.threeShip(order);
    } else {
      var d = this.directionToTake(cooX, cooY, 3);

      if(d) {
        var shipinfo = this.Populate(cooX,cooY,3,d, "Battleship " + order);

        stats.push(shipinfo);

        this.addBuffer(3);
      } else {
        game_global.grid[cooY][cooX] = " ";
        this.threeShip(order);
      }
    };
  }

  Grid.prototype.twoShip = function(order) {
    var cooX = Random();
    var cooY = Random();

    var gridCoordinate = this.checkCoordinate(cooX, cooY, 2);

    if (gridCoordinate == false) {
      console.log("2 wrong");
      this.twoShip(order);
    } else {
      var d = this.directionToTake(cooX, cooY, 2);

      if(d) {
        var shipinfo = this.Populate(cooX,cooY,2,d, "Destroyer " + order);

        stats.push(shipinfo);

        this.addBuffer(2);
      } else {
        game_global.grid[cooY][cooX] = " ";
        this.twoShip(order);
      }
    };
  }

  Grid.prototype.oneShip = function(order) {
    var cooX = Random();
    var cooY = Random();

    console.log("order", order);

    var gridCoordinate = this.checkCoordinate(cooX, cooY, 1);

    if (gridCoordinate == false) {
      this.oneShip(order);
    } else {
      stats.push([{ship: "Patrol Boat " + order, cooY: cooY, cooX: cooX, visited: "false"}]);
      this.addBuffer(1);
    }
  }

  Grid.prototype.addBuffer = function(s) {
    for (var i = 0; i < game_global.grid.length; i++) {
      for (var j = 0; j < game_global.grid[i].length; j++) {
        if (game_global.grid[j][i] == s) {
          // WEST
          if (i-1 >= 0) {
            if (game_global.grid[j][i-1] == " ") {
              game_global.grid[j][i-1] = "x";
            }
          }

          // EAST
          if (i+1 < game_global.grid.length) {
            if (game_global.grid[j][i+1] == " ") {
              game_global.grid[j][i+1] = "x";
            }
          }

          // NORTH
          if (j-1 >= 0) {
            if (game_global.grid[j-1][i] == " ") {
              game_global.grid[j-1][i] = "x";
            }
          }

          // SOUTH
          if (j+1 < game_global.grid[i].length) {
            if (game_global.grid[j+1][i] == " ") {
              game_global.grid[j+1][i] = "x";
            }
          }
        }
       }
    }
  }

  Grid.prototype.directionToTake = function(x, y, s) {
    var dirs = "WENS";

    //check which directions are available

    if (x - (s-1) < 0) {
      //console.log("west nope",s);
      dirs = dirs.replace("W","");
    }

    if (x + (s-1) > game_global.rows - 1) {
      //console.log("east nope",s);
      dirs = dirs.replace("E","");
    }

    if (y - (s-1) < 0) {
      //console.log("north nope",s);
      dirs = dirs.replace("N","");
    }

    if (y + (s-1) > game_global.columns - 1) {
      //console.log("south nope",s);
      dirs = dirs.replace("S","");
    }


    if (!dirs) {
      return false;
    }

    //select a random direction that has been left
    var where = dirs[Math.floor(Math.random()*dirs.length)];

    //now check if there are any empty spaces in that direction
    var isOk = this.EmptyCheck(x,y,s,where);

    if (isOk.length > 0) {
      return false;
    } else {
      return where;
    };
  }

  Grid.prototype.EmptyCheck = function(x,y,s,dir) {
    var isOk = [];

    if (dir == 'W') {
      for (var i = 1; i < s; i++ ) {
        if (game_global.grid[y][x - i] !== " ") {
          isOk.push('nope');
        }
      }
    } else if (dir == 'E') {
      for (var i = 1; i < s; i++ ) {
        if (game_global.grid[y][x + i] !== " ") {
          isOk.push('nope');
        }
      }
    } else if (dir == 'N') {
      for (var i = 1; i < s; i++ ) {
        if (game_global.grid[y - i][x] !== " ") {
          isOk.push('nope');
        }
      }
    } else if (dir == 'S') {
      for (var i = 1; i < s; i++ ) {
        if (game_global.grid[y + i][x] !== " ") {
          isOk.push('nope');
        }
      }
    }

    return isOk;
  }

  Grid.prototype.checkCoordinate = function(x,y,s) {
    if (game_global.grid[y][x] === " ") {
      game_global.grid[y][x] = s;
    } else {
      return false;
    }
  }

  Grid.prototype.Populate = function(x,y,s,d,ord) {
    var list = [];
      list.push({ship: ord, cooY: y, cooX: x, visited: false});

    if (d == 'W') {
      for (var i = 1; i < s; i++ ) {
        game_global.grid[y][x - i] = s;

        list.push({ship: ord, cooY: y, cooX: x - i, visited: false});
      }
    } else if (d == 'E') {
      for (var i = 1; i < s; i++ ) {
        game_global.grid[y][x + i] = s;
        list.push({ship: ord, cooY: y, cooX: x + i, visited: false});
      }
    } else if (d == 'N') {
      for (var i = 1; i < s; i++ ) {
        game_global.grid[y - i][x] = s;
        list.push({ship: ord, cooY: y - i, cooX: x, visited: false});
      }
    } else if (d == 'S') {
      for (var i = 1; i < s; i++ ) {
        game_global.grid[y + i][x] = s;
        list.push({ship: ord, cooY: y + i, cooX: x, visited: false});
      }
    }

    return list;
  };

  function Render(callback) {
    this.elboard = game_global.gridEl;
    this.elboard.style.width = (game_global.boxwidth * game_global.rows) + 'px';
    this.elboard.style.height = (game_global.boxheigth * game_global.columns) + 'px';

    if (this.renderGrid()) {
      callback;
    };

    console.log(stats);
  }

  Render.prototype.renderGrid = function() {
    for (var i = 0; i < game_global.grid.length; i++) {
      for (var j = 0; j < game_global.grid[i].length; j++) {
        var el = document.createElement('div');
          el.className = "box";

          el.style.width = game_global.boxwidth + "px";
          el.style.height = game_global.boxheigth + "px";
          el.style.left = (game_global.boxwidth * j + "px");
          el.style.top = (game_global.boxheigth * i + "px");
          el.id = "block-" + i + "-" + j;

          game_global.gridEl.appendChild(el);
      }
    }

    return true;
  }

  function ClickBind() {
    this.x = null;
    this.y = null;
    this.locationHandler;

    this.BindFirst();
  }

  ClickBind.prototype.BindFirst = function(){
    var self = this;

    this.locationHandler = this.onLocationHandler.bind(this);

    game_global.gridEl.addEventListener('click', self.locationHandler, false);

  }

  ClickBind.prototype.onLocationHandler = function(e) {
    this.x = e.pageX;
    this.y = e.pageY;

    var x = Math.floor(this.ClickPos(e).x / game_global.boxwidth);
    var y = Math.floor(this.ClickPos(e).y / game_global.boxheigth);

    this.FindWhatsThere(y, x);
    };

  ClickBind.prototype.ClickPos = function(event){
      var totalOffsetX = 0;
      var totalOffsetY = 0;
      var elX = 0;
      var elY = 0;
      var currentElement = game_global.gridEl;

      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;

      elX = event.pageX - totalOffsetX;
      elY = event.pageY - totalOffsetY;

      return {x:elX, y:elY}
  }

  ClickBind.prototype.FindWhatsThere = function(y,x) {
    var self = this;

    var el = document.getElementById('block-' + y + "-" + x);

    if (!el.classList.contains('checked')) {

      self.WhatWasHit(y,x);

      var val = game_global.grid[y][x];
        el.className += " checked";

        el.style.outline = 'none';

      if (val == 4) {
        el.className += " black";
      } else if (val == 3) {
        el.className += " gray";
      } else if (val == 2) {
        el.className += " brown";
      } else if (val == 1) {
        el.className += " purple";
      } else if (val == "x" ) {
        el.className += " lightblue"
      } else {
        el.className += " blue"
      }

    }

  }

  ClickBind.prototype.WhatWasHit = function(y,x) {
    var self = this;

    var ship;

    var hit = [];
    var all = [];

    //Find which ship was hit
    for (var i = 0; i < stats.length; i++) {
        for (var j = 0; j < stats[i].length; j++) {
        if (stats[i][j].cooY == y && stats[i][j].cooX == x) {
          ship = stats[i][j].ship;
          stats[i][j].visited = true;
        };
      }
    }

    //Now check if all areas of the ship have been destroyed
    for (var i = 0; i < stats.length; i++) {
      for (var j = 0; j < stats[i].length; j++) {
         if (stats[i][j].ship == ship) {
          all.push(stats[i][j].visited);

          if (stats[i][j].visited) {
            hit.push(stats[i][j].visited);
          }

         };
      }
    }

    if (all.length == hit.length && ship !== undefined) {
      destroyed.push(ship);
      document.getElementById('info-area').innerHTML += "<br/>" + ship.slice(0, ship.lastIndexOf(" ")) + ' destroyed !!!'
    }

    if (destroyed.length == ships.length) {
      document.getElementById('info-area').innerHTML += "<br/>" + "All ships have been destroyed !!!";

      game_global.gridEl.removeEventListener('click', self.locationHandler, false);
      document.getElementById("reset").style.display = "block";

    }
  }


  var game = {
    reset: function() {

      document.getElementById("reset").style.display = "none";

      var el = document.getElementById('bs-game');
      while( el.hasChildNodes() ){
          el.removeChild(el.lastChild);
      }

      document.getElementById('info-area').innerHTML = "";

      game_global.grid = [];
      stats = [];
      destroyed = [];
      grid = null;
      render = null;

      grid = new Grid();
      render = new Render(new ClickBind);
    },
    init: function() {
      grid = new Grid();

      render = new Render(new ClickBind);

      document.getElementById("reset").addEventListener('click', function() {
        game.reset();
      });
    }
  }

  game.init();
})()
