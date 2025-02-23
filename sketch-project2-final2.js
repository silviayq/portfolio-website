let font;
let letters = [];
let bgGraphics;



function preload() {
  font = loadFont('PixelifySans-VariableFont_wght.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  createGradientBackground();

  // positions and colors
  let fontSize = min(width, height) / 4;
  letters.push(new Letter('y', width / 5, height / 2, fontSize, color(128, 0, 128))); // purple
  letters.push(new Letter('e', width / 2.5, height / 2, fontSize, color(255, 255, 0))); // yellow
  letters.push(new Letter('e', width / 1.5, height / 2, fontSize, color(0, 255, 0))); // green
}

function draw() {
  image(bgGraphics, 0, 0); 
  
  for (let letter of letters) {
    letter.update();
    letter.show();
  }
}

// create background
function createGradientBackground() {
  bgGraphics = createGraphics(width, height);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 0, 0), color(0, 0, 255), inter); // red to blue
    bgGraphics.stroke(c);
    bgGraphics.line(0, y, width, y);
  }
}

// letter
class Letter {
  constructor(char, x, y, fontSize, hoverColor) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.hoverColor = hoverColor;
    this.currentColor = color(0); 
    this.points = font.textToPoints(this.char, this.x, this.y, this.fontSize, {
      sampleFactor: 0.2,
      simplifyThreshold: 0
    });
  }

  update() {
    // if mouse is near the letter
    for (let pt of this.points) {
      if (dist(mouseX, mouseY, pt.x, pt.y) < 40) {
        this.currentColor = this.hoverColor;
        return;
      }
    }
    // if mouse is not over
    this.currentColor = color(0);
  }

  show() {
    fill(this.currentColor);
    for (let pt of this.points) {
      ellipse(pt.x, pt.y, 10);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createGradientBackground();
}
