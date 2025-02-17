let words = ["meow", "huh", "yee"];
let fonts;
let currentWord = "meow";
let currentVariant = 0;
let points = [];
let particles = [];
let fontSize = 128;

function preload() {
  fonts = loadFont('ComicSans.ttf');
}

function setup() {
  createCanvas(500, 400);
  textFont(fonts);
  updateTextPoints();
}

function keyPressed() {
  if (key === '1') {
    currentWord = "meow";
  } else if (key === '2') {
    currentWord = "huh";
  } else if (key === '3') {
    currentWord = "yee";
  }
  currentVariant = 0;
  updateTextPoints();
}

function mousePressed() {
  currentVariant = (currentVariant + 1) % 3;
  updateTextPoints();
}

function updateTextPoints() {
  particles = [];
  points = fonts.textToPoints(currentWord, 100, 200, fontSize, { sampleFactor: 0.2 });
  if (currentVariant === 1) {
    for (let pt of points) {
      particles.push(new Particle(pt.x, pt.y));
    }
  }
}

//three different backgrounds
function draw() {
  if (currentWord === "meow") {
    background(255, 192, 203);
    fill(255, 105, 180);
    if (currentVariant === 0) {
      drawWaveText();
    } else if (currentVariant === 1) {
      animateParticles();
    } else if (currentVariant === 2) {
      drawPixelatedText();
    }
  } else if (currentWord === "huh") {
    background(0, 0, 255);
    fill(135, 206, 250);
    if (currentVariant === 0) {
      drawRotatingText();
    } else if (currentVariant === 1) {
      drawGlitchText();
    } else if (currentVariant === 2) {
      drawExpandingText();
    }
  } else if (currentWord === "yee") {
    background(255, 255, 0);
    fill(128, 0, 128);
    if (currentVariant === 0) {
      drawRippleText();
    } else if (currentVariant === 1) {
      drawFlickeringText();
    } else if (currentVariant === 2) {
      drawShakingText();
    }
  }
}

function drawWaveText() {
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let offset = sin(frameCount * 0.05 + i * 0.1) * 10;
    ellipse(pt.x + offset, pt.y, 5, 5);
  }
}

function animateParticles() {
  for (let p of particles) {
    p.update();
    p.display();
  }
}

function drawPixelatedText() {
  for (let pt of points) {
    rect(pt.x, pt.y, 6, 6);
  }
}

function drawRotatingText() {
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  for (let pt of points) {
    ellipse(pt.x - width / 2, pt.y - height / 2, 5, 5);
  }
  pop();
}

function drawGlitchText() {
  for (let pt of points) {
    let glitchX = random(-3, 3);
    let glitchY = random(-3, 3);
    ellipse(pt.x + glitchX, pt.y + glitchY, 5, 5);
  }
}

function drawExpandingText() {
  for (let pt of points) {
    ellipse(pt.x, pt.y, sin(frameCount * 0.05) * 10 + 5, sin(frameCount * 0.05) * 10 + 5);
  }
}

function drawRippleText() {
  for (let pt of points) {
    let d = dist(mouseX, mouseY, pt.x, pt.y);
    let ripple = sin(d * 0.05 - frameCount * 0.1) * 10;
    ellipse(pt.x + ripple, pt.y + ripple, 5, 5);
  }
}

function drawFlickeringText() {
  if (frameCount % 10 > 5) {
    for (let pt of points) {
      ellipse(pt.x, pt.y, 5, 5);
    }
  }
}

function drawShakingText() {
  for (let pt of points) {
    let shakeX = random(-2, 2);
    let shakeY = random(-2, 2);
    ellipse(pt.x + shakeX, pt.y + shakeY, 5, 5);
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
  }
  update() {
    this.pos.add(this.vel);
  }
  display() {
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}