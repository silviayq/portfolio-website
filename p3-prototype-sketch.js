let video;
let asciiArt;


let kaomoji = ["✖", "╭∩╮", "ಠ_ಠ", "(╯°□°）╯", "٩(◕‿◕｡)۶", "(｡♥‿♥｡)", "(づ｡◕‿‿◕｡)づ", "(*≧▽≦)"];

let fontSizeStatic = 10;
let fontSizeMax = 24; 

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(80, 60); 
  video.hide();
  textAlign(CENTER, CENTER);
  frameRate(10); 
}



function draw() {
  background(0);
  video.loadPixels();
  
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
}
