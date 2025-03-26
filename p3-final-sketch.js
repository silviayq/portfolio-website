let video;
let kaomoji = ["✖", "╭∩╮", "ಠ_ಠ", "(╯°□°）╯", "٩(◕‿◕｡)۶", "(｡♥‿♥｡)", "(づ｡◕‿‿◕｡)づ", "(*≧▽≦)"];
let fontSizeStatic = 10;
let fontSizeMax = 24;

let heartLayer;
let hearts = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(80, 60); 
  video.hide();
  textAlign(CENTER, CENTER);
  frameRate(10);

  // <3 layer
  heartLayer = createGraphics(width, height);
  heartLayer.clear();

  for (let i = 0; i < 30; i++) {
    hearts.push(new Heart());
  }
}

function draw() {
  background(0);
  video.loadPixels();

  //kaomoji layer
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let brightness = (r + g + b) / 3;
      let charIndex = floor(map(brightness, 0, 255, 0, kaomoji.length - 1));
      let symbol = kaomoji[charIndex];
      let posX = x * 8;
      let posY = y * 8;
      let dynamicFontSize = map(brightness, 0, 255, fontSizeStatic, fontSizeMax);
      textSize(dynamicFontSize);
      fill(255);
      text(symbol, posX, posY);
    }
  }

  heartLayer.clear();
  for (let h of hearts) {
    h.update();
    h.display(heartLayer);
  }
  image(heartLayer, 0, 0);
}

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    //from bottom 
    this.y = random(height, height + 100); 
    this.size = random(18, 32);
    this.speed = random(0.3, 1.0);
    this.alpha = random(120, 200);
  }

  update() {
    this.y -= this.speed;
    if (this.y < -20) {
      this.reset();
      this.y = height + random(20, 100);
    }
  }

  display(g) {
    g.textAlign(CENTER, CENTER);
    g.textSize(this.size * 1.3); 
    g.stroke(255);               
    g.strokeWeight(1);
    g.fill(80, 180, 255, this.alpha); 
    g.text("♡", this.x, this.y);
  }
}


