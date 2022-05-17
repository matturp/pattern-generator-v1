let paletteA = ["#002626","#0e4749","#95c623","#e55812","#efe7da","#93b7be","#f1fffa","#785964","#fcfcfc"];
let paletteB = ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"];
let paletteC = ["#ffe8d6","#829e95","#f1f1f1","#ff7f11","#ffffff","#829e95","#022b3a","#ffe8d6","#fAf5f0","#1c1c1c"];
let paletteD = ["#ffcdb2","#ffb4a2","#e5989b","#b5838d","#6d6875"];
let paletteE = ["#fbf8cc","#fde4cf","#ffcfd2","#f1c0e8","#cfbaf0","#a3c4f3","#90dbf4","#8eecf5","#98f5e1","#b9fbc0"];
let paletteF = ["#f8f9fa","#e9ecef","#dee2e6","#ced4da","#adb5bd","#6c757d","#495057","#343a40","#212529", "#FEEBF4"];
var paletteColour = paletteC;
var cells = 2;
var complexity = 0;
var complexityMax = 200;
var steps = 1;
var stepsMin = 1;
var stepsMax = 3;
var stepsStep = 1;

function setup() {
  createCanvas(800, 600);
  //noCursor();
  noLoop();
  noStroke();
  imageMode(CENTER);
  ellipseMode(CORNER);

  // GUI

  gui = createGui('VARIABLES').setPosition(width + 20, 50);
  sliderRange(2, 20, 2);
  gui.addGlobals('cells', 'steps', 'complexity');

  // DOM

  var button = createButton('Toggle Colour');
  button.mousePressed(changePalette);
  button.position(width + 20, 20);

  var buttonB = createButton('Randomise');
  buttonB.mousePressed(generatePattern);
  buttonB.position(width + 20, 250);

}

function changePalette(){
  if (paletteColour == paletteA){
    paletteColour = paletteB;
  } else if  
    (paletteColour == paletteB){
      paletteColour = paletteC;
    } else if
    (paletteColour == paletteC){
      paletteColour = paletteD;
    } else if
    (paletteColour == paletteD){
      paletteColour = paletteE;
    } else if
    (paletteColour == paletteE){
      paletteColour = paletteF;
    } else if
    (paletteColour == paletteF){
      paletteColour = paletteA;
    }
    redraw();
  }

  function generatePattern(){
    redraw();
  }

function draw() {
  background(255);

  var s = width/cells;
  var c = 1;

  if (steps == 2){
  c = 0.8;
  } else
  if (steps == 3){
    c = 0.5;
  }

  for ( let x = 0; x < width; x += s ){
    for (let y = 0; y < height; y += s * c){
			if (random() < 0.2) {
				makeTile(x, y, s/2);
				makeTile(x+s/2, y, s/2);
				makeTile(x, y+s/2, s/2);
				makeTile(x+s/2, y+s/2, s/2);
			} else {
makeTile(x, y, s);
      }
    }
  }
}

function makeTile(x, y, s) {
	shuffle(paletteColour, true);
	fill(paletteColour[0]);
	square(x, y, s);

  push();
	translate(x+s/2, y+s/2);
	rotate(random([0, PI/2, PI, 3*PI/2]));
	fill(paletteColour[1]);
	let r = floor(random(5));
	if (r == 0) {
		arc(-s/2, 0, s, s, -PI/2, PI/2);
	} else if (r == 1) {
		rect(-s/2, -s/2, s/2, s);
	} else if (r == 2) {
		triangle(-s/2, -s/2, s/2, -s/2, -s/2, s/2);
	} else if (r == 3) {
    circle(-s/2, -s/2, s);
    stroke(paletteColour[3]);
    strokeWeight(2);
    noFill();
    circle(-s/2, -s/2, complexity * 0.5);
  } else if (r == 4) {
    stroke(paletteColour[2]);
    strokeWeight(2);
    line(-s, -s, s + complexity, s + complexity);
  }
	pop();
}

function keyPressed() {
  if (key == " ") {
save('my pattern.png');
  }
}

function mouseDragged(){
  redraw();
}

function mouseReleased(){
  //redraw();
}