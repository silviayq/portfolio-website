let font;
let letters = [];
let bgGraphics;
let bgFlow = true;
let timeOffset = 0;

function preload() {
  font = loadFont('PixelifySans-VariableFont_wght.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // letters‘ positions
  let fontSize = min(width, height) / 4;
  letters.push(new Letter('h', width / 5, height / 2, fontSize));
  letters.push(new Letter('u', width / 2.5, height / 2, fontSize));
  letters.push(new Letter('h', width / 1.5, height / 2, fontSize));
}

function draw() {
  if (bgFlow) {
    drawDynamicBackground();
  } else {
    image(bgGraphics, 0, 0); // freeze background
  }

  let hoverDetected = false;

  for (let letter of letters) {
    letter.update();
    letter.show();

    if (letter.isHovered) {
      hoverDetected = true;
    }
  }

  // freeze background if any letter is hovered
  bgFlow = !hoverDetected;
}

// background
function drawDynamicBackground() {
  bgGraphics = createGraphics(width, height);
  timeOffset += 0.05; // speed of bg flow

  for (let y = 0; y < height; y++) {
    let inter = map(sin(y * 0.05 + timeOffset), -1, 1, 0, 1);
    let c = lerpColor(color(255), color(255, 0, 0), inter); // bg color
    bgGraphics.stroke(c);
    bgGraphics.line(0, y, width, y);
  }

  image(bgGraphics, 0, 0);
}

//letter
class Letter {
  constructor(char, x, y, fontSize) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.basePoints = font.textToPoints(this.char, this.x, this.y, this.fontSize, {
      sampleFactor: 0.2,
      simplifyThreshold: 0
    });
    this.points = [];
    for (let pt of this.basePoints) {
      this.points.push({ x: pt.x, y: pt.y, offsetX: 0, offsetY: 0 });
    }
    this.isHovered = false;
  }

  update() {
    this.isHovered = false;
    for (let pt of this.points) {
      let d = dist(mouseX, mouseY, pt.x + pt.offsetX, pt.y + pt.offsetY);
      if (d < 40) {
        this.isHovered = true;
      }
    }

    // jump effect
    for (let pt of this.points) {
      if (this.isHovered) {
        pt.offsetX = random(-10, 10);
        pt.offsetY = random(-10, 10);
      } else {
        pt.offsetX = lerp(pt.offsetX, 0, 0.1);
        pt.offsetY = lerp(pt.offsetY, 0, 0.1);
      }
    }
  }

  show() {
    for (let pt of this.points) {
      // color
      let interColor = lerpColor(color(0, 0, 255), color(0), map(pt.y, 0, height, 0, 1));
      fill(interColor);
      ellipse(pt.x + pt.offsetX, pt.y + pt.offsetY, 10);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
