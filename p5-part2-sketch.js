let userInput;
let button;
let result = "";

function setup() {
  createCanvas(600, 400);
  background(240);

  createElement('h2', 'Fortune Funnies');

  userInput = createInput();
  userInput.position(20, 80);
  userInput.size(300);

  button = createButton('Divine My Fate');
  button.position(userInput.x + userInput.width + 10, 80);
  button.mousePressed(getJoke);
  
  textAlign(LEFT);
  textSize(16);
}

function draw() {
  background(240);
  text("Your Oracle Says:", 20, 150);
  text(result, 20, 180, width - 40, height - 180);
}

function getJoke() {
  if (userInput.value().trim() === "") {
    result = "Please ask a real question!";
    return;
  }

  loadJSON("https://official-joke-api.appspot.com/random_joke", (data) => {
    result = data.setup + "\n" + data.punchline;
  });
}
