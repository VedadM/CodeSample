var level, display, render;
var stop = false;

var levelStats = {
		currentLevel: 2,
		levels: [
			[
				"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
				"x            xx           0x",
				"x xxxx xxxxx xx xxxxx xxxx x",
				"x xxxx xxxxx xx xxxxx xxxx x",
				"x xxxx xxxxx xx xxxxx xxxx x",
				"x                          x",
				"x xxxx xx xxxxxxxx xx xxxx x",
				"x xxxx xx xxxxxxxx xx xxxx x",
				"x0     xx    xx    xx      x",
				"xxxxxx xxxxx xx xxxxx xxxxxx",
				"xxxxxx xxxxx xx xxxxx xxxxxx",
				"xxxxxx xx          xx xxxxxx",
				"xxxxxx xx xxxxxxxx xx xxxxxx",
				"xxxxxx xx x      x xx xxxxxx",
				"          x      x          ",
				"xxxxxx xx x      x xx xxxxxx",
				"xxxxxx xx xxxxxxxx xx xxxxxx",
				"xxxxxx xx          xx xxxxxx",
				"xxxxxx xx xxxxxxxx xx xxxxxx",
				"xxxxxx xx xxxxxxxx xx xxxxxx",
				"x            xx            x",
				"x xxxx xxxxx xx xxxxx xxxx x",
				"x xxxx xxxxx xx xxxxx xxxx x",
				"x   xx       @        xx   x",
				"xxx xx xx xxxxxxxx xx xx xxx",
				"xxx xx xx xxxxxxxx xx xx xxx",
				"x      xx    xx    xx      x",
				"x xxxxxxxxxx xx xxxxxxxxxx x",
				"x xxxxxxxxxx xx xxxxxxxxxx x",
				"x                          x",
				"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			],
			[
				"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
				"x    @           0         x",
				"x xx xxxxxxxxxxxxxxxxxx xx x",
				"x xx xxxxxxxxxxxxxxxxxx xx x",
				"x xx xxxxxxxxxxxxxxxxxx xx x",
				"x xx                    xx x",
				"x xx xxxxx xxxxxx xxxxx xx x",
				"x xx xxxxx xxxxxx xxxxx xx x",
				"x xx xxxxx xxxxxx xxxxx xx x",
				"x xx xxxxx xxxxxx xxxxx xx x",
				"x          xxxxxx          x",
				"xxxxx xxxx xxxxxx xxxx xxxxx",
				"x     xxxx xxxxxx xxxx     x",
				"x xxxxxxxx xxxxxx xxxxxxxx x",
				"x xx          0         xx x",
				"x xx xxxxxxxxxxxxxxxxxx xx x",
				"x xx xxxxxxxxxxxxxxxxxx xx x",
				"x xx          0         xx x",
				"x xxxxxxxxxx xx xxxxxxxxxx x",
				"x            xx    0       x",
				"xxxxxxxxxxxx xx xxxxxxxxxxxx",
				"xxxxxxxxxxxx xx xxxxxxxxxxxx",
				"x                          x",
				"x xxxxx xxxx xx xxxx0xxxxx x",
				"x xxxxx xxxx xx xxxx xxxxx x",
				"x0           xx            x",
				"x xxxxx xxxx xx xxxx xxxxx x",
				"x xx    xxxx    xxxx    xx x",
				"x xx xxxxxxxxxxxxxxxxxx xx x",
				"x                          x",
				"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			],
			[
				"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
				"x0     x    x       x   xx x",
				"x xx x x xx xx xxx xx x x  x",
				"x    x   x            x   xx",
				"xxxx xxx xxxxx x x xxxxxx  x",
				"x    x x       x x xx   xx x",
				"x xxxx   xxx xxx x  0 x    x",
				"x    xxx x x     xx x x xxxx",
				"xxxx     x   xxx xx xxx x  x",
				"x    xxx x x   x      x   xx",
				"x xxxx   x x xxxx xxxxxxx  x",
				"x      xxx x   xx x xx  xx x",
				"x xx xxx   x x  x    xx    x",
				"x xx x x xxx xx xxxx xxxxx x",
				"x            xx   xx       x",
				"x xxx xx xxx  xxx x  xxxxx x",
				"x x   x  x xx x x xx  x    x",
				"xxx xxxx x    x      xx xx x",
				"x   x      xx x xxxxxxx xx x",
				"x xxx xx xxx         x     x",
				"x          xx xxx x xx x x x",
				"x xxxx x x    x xxx    xxx x",
				"x x xx xxx xx       xx     x",
				"x          xx xxx x xx xxxxx",
				"xxxxx xx x  x     x        x",
				"x        x xxxxxxxxxxx xxx x",
				"x xxx xx x      @      x x x",
				"x x        xx xxx xxxx     x",
				"x x xx xxx xx x x    x xxx x",
				"x   x       x     xx       x",
				"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			],
		]
	};

function elt(name, className) {
	var el = document.createElement(name);

	if (className) el.className = className;
		return el;
}

function Vector(x, y) {
	this.x = x;
	this.y = y;
};

Vector.prototype.plus = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.times = function(factor) {
	return new Vector(this.x * factor, this.y * factor);
};

function Display(d) {
	this.wrap = d.appendChild(elt("div", "game"));
	this.wrap.w = 224 * 2;
	this.wrap.h = 248 * 2;

	this.wrap.style.width = this.wrap.w + 'px';
	this.wrap.style.height = this.wrap.h + 'px';

}

function Level(num) {
	this.level = levelStats.levels[num],
	this.height = this.level.length,
	this.width = this.level[num].length;
	this.grid = [];
	this.actors = [];
	this.displayX = display.wrap.w;
	this.displayY = display.wrap.h;
	this.gridBoxWidth = this.displayX / this.width;
	this.gridBoxHeigth = this.displayY / this.height;

	var self = null;

	var self = this;

	console.log(this.grid,this.actors);

	var enemycounter = 0;

	for (var x = 0; x < this.height; x++) {
		var gridLine = [];
		for (var y = 0; y < this.width ; y++) {

			var fieldType = null;

			if (this.level[x][y] == '@') {
				this.actors.push(new Player(new Vector(y*this.gridBoxWidth,x*this.gridBoxHeigth), self.gridBoxWidth, self.gridBoxHeigth, "Player"));
			} else if (this.level[x][y] == '0') {
				this.actors.push(new Enemy(new Vector(y*this.gridBoxWidth,x*this.gridBoxHeigth), self.gridBoxWidth, self.gridBoxHeigth, "Enemy" + enemycounter++));
			} else if (this.level[x][y] == 'x') {
				fieldType = "wall";
			}

			gridLine.push(fieldType);
		}
		this.grid.push(gridLine);
	}
};

Level.prototype.objectPosition = function(el) {
	for (var i = 0; i < this.actors.length; i++) {

		if (this.actors[i].constructor.name == "Enemy") {
			var other = this.actors[i];

			if (el.pos.x + el.size.x > other.pos.x &&
				el.pos.x < other.pos.x + other.size.x &&
				el.pos.y + el.size.y > other.pos.y &&
				el.pos.y < other.pos.y + other.size.y) {

				return true;
			}
		}
	}
};

Level.prototype.obstacleAt = function(pos, size) {
		var xStart = Math.floor(pos.x / this.gridBoxWidth);
		//var xEnd = Math.ceil((pos.x + this.gridBoxWidth) / this.gridBoxWidth);
		var xEnd = Math.ceil((pos.x + size.x) / this.gridBoxWidth);
		var yStart = Math.floor(pos.y / this.gridBoxHeigth );
		//var yEnd = Math.ceil((pos.y + this.gridBoxHeigth) / this.gridBoxHeigth );
		var yEnd = Math.ceil((pos.y + size.y) / this.gridBoxHeigth );

		if (xStart < 0 || xEnd > this.width || yStart < 0)
			return "wall";
		for (var y = yStart; y < yEnd; y++) {
			for (var x = xStart; x < xEnd; x++) {
				var fieldType = this.grid[y][x];
				if (fieldType) return fieldType;
			}
		}
};

function Enemy(pos, gridx, gridy, elname) {
	this.pos = new Vector(pos.x, pos.y);
	this.size = new Vector(gridx, gridy);
	this.elname = elname;
	this.speed = new Vector(0, 0);
	this.stepX = gridx / 8;
	this.stepY = gridy / 8;

	this.initialD = "N";

	this.backDir = "";
}

Enemy.prototype.act = function() {
	// this.gridX = Math.floor(this.pos.x / 8);
	// this.gridY = Math.floor(this.pos.y / 8);

	var futureX = this.pos.x;
	var futureY = this.pos.y;

	var dir;
	var xPlus, xMinus, yPlus, yMinus;
	var north, south, east, west;

	yMinus = new Vector(futureX , futureY - this.stepY);
	xPlus = new Vector(futureX + this.stepX , futureY);
	xMinus = new Vector(futureX - this.stepX , futureY);
	yPlus = new Vector(futureX , futureY + this.stepY);

	north = level.obstacleAt(yMinus, this.size);
	south = level.obstacleAt(yPlus, this.size);
	west = level.obstacleAt(xMinus, this.size);
	east = level.obstacleAt(xPlus, this.size);


	var dirs = this.getDirection(north,south,west,east);
	var tempDir, toSplice;

    if (this.initialD == "W") {this.backDir = "E";}
    else if (this.initialD == "E") {this.backDir = "W";}
    else if (this.initialD == "N") {this.backDir = "S";}
    else if (this.initialD == "S") {this.backDir = "N";}


	if (dirs.length >= 3) {

		var index = dirs.indexOf(this.backDir);
		var exclude = dirs.splice(index, 1);

		tempDir = dirs[Math.floor(Math.random() * (dirs.length) + 0)];
		this.initialD = tempDir;

	} else if(dirs.length == 2) {
		var index = dirs.indexOf(this.backDir);
			tempDir = dirs.splice(index, 1);

			tempDir = dirs;
			this.backDir = this.initialD;
	} else {
		this.initialD = this.backDir;
		this.backDir = this.initialD;
	}

	if (this.initialD == "N") {

		futureY -= this.stepY;

	} else if (this.initialD == "E") {

		futureX += this.stepX;

	} else if (this.initialD == "W") {

		futureX -= this.stepX;

	} else if (this.initialD == "S"){

		futureY += this.stepY;

	}

	var newPos = new Vector(futureX, futureY);

	// Walls
	var obstacle = level.obstacleAt(newPos, this.size);

		if (!obstacle && !stop) {

			this.pos = newPos;

			this.move();
		} else {
			this.initialD = tempDir;
		}
}

Enemy.prototype.getDirection = function(n,s,w,e) {
	var arr = [];

	var n = (n == undefined) ? arr.push("N") : "wall";
	var s = (s == undefined) ? arr.push("S") : "wall";
	var w = (w == undefined) ? arr.push("W") : "wall";
	var e = (e == undefined) ? arr.push("E") : "wall";

	return arr;
}

Enemy.prototype.move = function() {
 	this.el.style.left = this.pos.x + "px";
 	this.el.style.top = this.pos.y + "px";
}

function Player(pos, gridx, gridy, elname) {
	this.pos = new Vector(pos.x, pos.y);
	this.size = new Vector(gridx, gridy);
	this.speed = new Vector(0, 0);
	this.elname = elname;
	this.x = pos.x;
	this.y = pos.y;
	this.stepX = gridx / 4;
	this.stepY = gridy / 4;

	this.prevX = 0;
	this.prevY = 0;
}

Player.prototype.act = function(keys) {

	var tempX = this.pos.x;
	var tempY = this.pos.y;

	if (keys.right) tempX = (this.pos.x < display.wrap.w - this.size.y) ? this.pos.x + this.stepX : display.wrap.w - this.size.y;
	if (keys.left) tempX = (this.pos.x >= 0) ? this.pos.x - this.stepX : 0;
	if (keys.up) tempY = (this.pos.y >= 0) ? this.pos.y - this.stepY : 0;
	if (keys.down) tempY = (this.pos.y < display.wrap.h - this.size.y) ? this.pos.y + this.stepY : display.wrap.h - this.size.y;

	if (this.x < 0) tempX = 0;
	if (this.y < 0) tempY = 0;
	if (this.x > display.wrap.w) tempX = display.wrap.w - this.size.x;
	if (this.y > display.height) tempY = display.wrap.h - this.size.y;

	var newPos = new Vector(tempX, tempY);

	// Walls
		var obstacle = level.obstacleAt(newPos, this.size);

	// Moving Objects
	var collision = level.objectPosition(this);

	if (collision) {
		stop = true;
	}

		if (!obstacle) {
			this.pos = newPos;
			this.move();
		}
}

Player.prototype.move = function() {
 	this.el.style.left = this.pos.x + "px";
 	this.el.style.top = this.pos.y + "px";
}

function Render(el, l) {
	var self = this;

	this.level = l;

	this.w = this.level.gridBoxWidth;
	this.h = this.level.gridBoxHeigth;

	el.appendChild(this.drawBackground());

	this.level.actors.forEach(function(child){
		el.appendChild(self.drawCharacters(child));
		child.el = document.querySelector('.' + child.elname);
	});
}

Render.prototype.drawBackground = function() {
	var div = elt("div", "background"),
		rowNum = 0,
		self = this;

	this.level.grid.forEach(function(row) {
		var elNum = 0;

		row.forEach(function(el) {
			if (el == "wall") {
				var l = elt("div", "wall");

				l.style.width = self.w + "px";
				l.style.height = self.h + "px";
				l.style.left = (self.w * elNum + "px");
				l.style.top = (self.h * rowNum + "px");
				l.id = elNum + "-" + rowNum;

				div.appendChild(l);
			}

			elNum++;
		});
		rowNum++;

	});

	return div;
}

Render.prototype.drawCharacters = function(el) {

	var name = el.elname;

	var player = elt("div", name);
		player.style.width = el.size.x + "px";
		player.style.height = el.size.y + "px";
		player.style.left = (el.pos.x) + "px";
		player.style.top = (el.pos.y) + "px";
		player.className += " movers";

	return player;
}

Render.prototype.animate = function(arrow) {

	this.level.actors.forEach(function(el){

		if (el.constructor.name == "Enemy") {
			el.act();
		}

		if (el.constructor.name == "Player") {
			el.act(arrow);
		}
	})
};


var game =  {
	arrowCodes: {37: "left", 38: "up", 39: "right", 40: "down"},
	arrow: null,
	trackKeys: function(codes) {
		var pressed = Object.create(null);

		function handler(event) {
			if (codes.hasOwnProperty(event.keyCode)) {
				var down = event.type == "keydown";

				pressed[codes[event.keyCode]] = down;

				event.preventDefault();
			}
		}

		addEventListener("keydown", handler);
		addEventListener("keyup", handler);

		return pressed;
	},
	runAnimation: function(lvl) {

		function frame() {
			console.log(game.arrow);
			lvl(game.arrow);

			if (!stop) {
				requestAnimationFrame(frame);
			} else {
				game.end();
			}
		}

		requestAnimationFrame(frame);
	},
	end: function() {
		var d = document.querySelectorAll(".wall");
		var m = document.querySelectorAll(".movers");

		for (var i = 0; i < d.length; i++) {
			d[i].className += " endScreen";
		}

		for (var i = 0; i < m.length; i++) {
			m[i].setAttribute("style", "-webkit-transition: all 2s linear; -moz-transition: all 2s linear; transition: all 2s linear;");
			m[i].className += " endScreenMovers";
		}

		window.setTimeout(function() {
			document.querySelector('.startScreen').style.display = "block";

			game.reset();

		}, 3000);
	},
	gamestart: function() {
		stop = false;

		game.arrow = game.trackKeys(game.arrowCodes);

		level = new Level(levelStats.currentLevel);

		render = new Render(display.wrap, level);

		game.runAnimation(render.animate);
	},
	startScreenBuild: function() {

		// Start Screen
		var el = document.createElement("div");
			el.className += " startScreen";

		// Start Button
		var button = document.createElement("div");
			button.className += " startGame";
			button.id = "start";
			button.innerHTML = "Start";

		var levelSelector = document.createElement("ul"),
			sel = [];

			levelSelector.className += " levelSelect"

		for (var i = 0; i < 3; i++) {
			var ls = document.createElement("li");
				ls.className += " toSelect";
				ls.innerHTML = i + 1;

			levelSelector.appendChild(ls);
		}

		el.appendChild(levelSelector);
		el.appendChild(button);

		document.querySelector(".game").appendChild(el);

		game.startScreenEvents();

	},
	startScreenEvents: function() {
		for (var i = 0; i < document.querySelectorAll(".toSelect").length; i++) {
			document.querySelectorAll(".toSelect")[i].addEventListener('click', function() {
				levelStats.currentLevel = this.innerHTML - 1;
			})
		}

		document.getElementById("start").addEventListener('click', function() {
			game.gamestart();
			document.querySelector('.startScreen').style.display = "none";
		});
	},
	reset: function() {
		document.querySelector(".game").removeChild(document.querySelector(".background"));

	    var elements = document.getElementsByClassName("movers");

		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	},
	init: function() {
		display = new Display(document.body);

		game.startScreenBuild();
	}
}

game.init();
