let bg;
let oracleFont;
let input, button;
let result = "";
let sparkles = [];

function preload() {
  bg = loadImage("oracle.png");
  oracleFont = loadFont("GreatVibes-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(oracleFont);
  textSize(30);
  fill("#C2185B");
  noStroke();

  input = createInput();
  input.position(50, 100);
  input.size(300);
  input.style("font-family", "GreatVibes");
  input.style("font-size", "20px");
  input.style("padding", "8px");
  input.style("background-color", "#C2185B");
  input.style("color", "white");
  input.style("border", "none");

  button = createButton('Ask the Oracle');
  button.position(input.x + input.width + -10, 100);
  button.mousePressed(fetchJokeAndSparkle);
  button.style("font-family", "GreatVibes");
  button.style("font-size", "20px");
  button.style("padding", "8px 16px");
  button.style("background-color", "#C2185B");
  button.style("color", "white");
  button.style("border", "none");
  button.style("cursor", "pointer");
}

function draw() {
  background(bg);
  fill("#C2185B");
  text("What wisdom shall be revealed?", 50, 70);
  text(result, 50, 200, width - 100);

  for (let s of sparkles) {
    s.update();
    s.display();
  }

  // delete sparkles
  sparkles = sparkles.filter(s => s.life > 0);
}

function fetchJokeAndSparkle() {
  let q = input.value().trim();
  if (q === "") {
    result = "Whisper your question to the cosmos...";
    return;
  }

  loadJSON("https://official-joke-api.appspot.com/random_joke", (data) => {
    result = data.setup + "\n" + data.punchline;
  });

  // add sparkles
  for (let i = 0; i < 30; i++) {
    sparkles.push(new Sparkle(random(width), random(height)));
  }
}

// sparkles
class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 60;
    this.size = random(5, 15);
    this.opacity = 255;
  }

  update() {
    this.life--;
    this.opacity -= 4;
  }

  display() {
    push();
    noStroke();
    fill(255, this.opacity);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
