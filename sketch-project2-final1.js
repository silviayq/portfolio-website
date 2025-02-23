let font;
let points = [];
let particles = [];



function preload() {
  font = loadFont('PixelifySans-VariableFont_wght.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  
  let fontSize = min(width, height) / 5; 
  points = font.textToPoints('meow', width / 4, height / 2, fontSize, {
    //curve
    sampleFactor: 0.15,  
    simplifyThreshold: 0
  });

  // particles
  for (let pt of points) {
    particles.push(new Particle(pt.x, pt.y));
  }
}

function draw() {
  background(0, 50); // glow effect

  for (let p of particles) {
    p.update();
    p.show();
  }
}

// Particle jump and glow
class Particle {
  constructor(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.size = 5;
    this.angle = random(TWO_PI);
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    // effect when mouse is near
    if (d < 120) {
      this.x = this.baseX + sin(frameCount * 0.2 + this.angle) * random(3, 12);
      this.y = this.baseY + cos(frameCount * 0.2 + this.angle) * random(3, 12);
    } else {
      // return to base position
      this.x = lerp(this.x, this.baseX, 0.1);
      this.y = lerp(this.y, this.baseY, 0.1);
    }
  }

  show() {
    // glow effect
    for (let i = 8; i > 0; i--) {
      fill(255, 255, 255, 10);
      ellipse(this.x, this.y, this.size + i);
    }
    // core point
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  particles = []; // clear particles

  let fontSize = min(width, height) / 5;
  points = font.textToPoints('meow', width / 4, height / 2, fontSize, {
    sampleFactor: 0.15,
    simplifyThreshold: 0
  });

  for (let pt of points) {
    particles.push(new Particle(pt.x, pt.y));
  }
}
