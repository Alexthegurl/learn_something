// define starfield class to use for game
function Starfield() {
	this.fps = 30;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 15;
	this.maxVelocity = 30;
	this.starts = 100;
	this.intervalId = 0;
}


// But we can actually do a little better. If our function is complicated, then re-creating it for every instance is actually not very efficient, what we want to do is actually create the function once and have every instance automatically get it. That's where the prototype comes in.

// When you put the dot after an instance of the type created by the function, the engine will try to find a property on that type. If it can't find it, it'll look on the 'prototype' of the type. When we create an instance of type type using the function, it inherits the same prototype each time. 

//initialize the starfield

Starfield.prototype.initialise = function(div) {
		var self = this;
		//adding function to starfield prototype
		this.containerDiv = div;
		self.width = windo.innerWidth;
		self.height = window.innerHeight;
		//sorting client area of the browser window
		window.addEventListener('resize', function resize(event) {
			self.width = window.innerWidth;
			self.height = window.innerHeight;
			self.canvas.width = self.width;
			self.canvas.height = self.height;
			self.draw();
		});

	//create the canvas
	//document object represents DOM
	var canvas = document.createElemtn('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;

};

//create logic of starfield

Starfield.prototype.start = function(){
	//create stars
	var stars = [];
	for (var i=0; i <this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//star timer :)
	this.intervalId = setInterval(function(){
		self.update();
		self.draw();
	}, 1000 /this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

//create update function to update the state of the starfield, core logic for moving the stars

Starfield.prototype.update = function(){
	var dt = 1 / this.fps;
	for (var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;
		 //  If the star has moved from the bottom of the screen, spawn it at the top website says
		 if(star.y > this.height) {
		 	this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		 }
	}
};

//draw function for if the star has moved past the bottom of the screen
Starfield.prototype.draw = function(){
	var ctx = this.canvas.getContext("2d");

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);

	//draw stars
	ctx.fillStyle = '#ffffff';
	for (var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
};

//creating a star
function Star(x, y, size, velocity) {
    this.x = x;
    this.y = y; 
    this.size = size;
    this.velocity = velocity;
} 