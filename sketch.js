/* eslint-disable */

var vectors = [];
var canvasWidth = 800;
var canvasHeight = 600;
var maxVectors = 20;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  for (var i = 0; i < maxVectors; i++) {
    vectors[i] = new Vector(
      random(canvasWidth), 
      random(canvasHeight), 
      random(canvasWidth), 
      random(canvasHeight));
  }
}

function draw() {
  background(0);
  for (var i = 0; i < vectors.length; i++) {
    vectors[i].move();
    vectors[i].display();
  }
}

function Vector(x1, y1, xFinal, yFinal) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x1;
  this.y2 = y1;
  this.xFinal = xFinal;
  this.yFinal = yFinal;

  this.display = function() {
    stroke(255);
    noFill();
    line(this.x1, this.y1, this.x2, this.y2);
  }

  this.move = function() {
    if (frameCount > 800) {
      this.x2 = this.xFinal;
      this.y2 = this.yFinal;
      return;
    }

    if (this.remainingX() >= 1) {
      this.x2 = this.x2 + 1;
    } else if (this.remainingX() <= 1) {
      this.x2 = this.x2 - 1;
    } else {
      this.x2 = this.xFinal;
    }

    if (this.remainingY() >= 1) {
      this.y2 = this.y2 + 1;
    } else if (this.remainingY() <= 1) {
      this.y2 = this.y2 - 1;
    } else {
      this.y2 = this.yFinal;
    }
  }

  this.remainingX = function() {
    return this.xFinal - this.x2
  }

  this.remainingY = function() {
    return this.yFinal - this.y2
  }
}
