let font;
let points = [];
function preload() {
    font = loadFont('ComicSans.ttf');
}

function setup() {
    createCanvas(800, 500);
    background(0);
    textFont(font);
    textSize(60);
    noStroke();
    
    let positions = [
        { x: 50, y: 100 }, { x: 250, y: 100 }, { x: 450, y: 100 }, { x: 650, y: 100 },
        { x: 150, y: 250 }, { x: 350, y: 250 }, { x: 550, y: 250 }
    ];
    let effects = ['float', 'mask', 'split', 'gradient', 'pattern', 'wave', 'scatter'];
    
    for (let i = 0; i < positions.length; i++) {
        let pts = font.textToPoints("meow", positions[i].x, positions[i].y, 60, {
            sampleFactor: 0.2
        });
        points.push({ effect: effects[i], data: pts });
    }
}

function draw() {
    background(0);
    
    for (let item of points) {
        if (item.effect === 'float') {
            fill(255, 0, 0);
            for (let p of item.data) {
                let offsetX = sin(p.y * 0.05 + millis() * 0.002) * 5;
                ellipse(p.x + offsetX, p.y, 5, 5);
            }
        } else if (item.effect === 'mask') {
            fill(255, 0, 0);
            for (let p of item.data) {
                let d = dist(mouseX, mouseY, p.x, p.y);
                if (d > 30) ellipse(p.x, p.y, 5, 5);
            }
        } else if (item.effect === 'split') {
            for (let p of item.data) {
                let c = p.x < width / 2 ? color(255, 0, 0) : color(0, 255, 0);
                fill(c);
                ellipse(p.x, p.y, 5, 5);
            }
        } else if (item.effect === 'gradient') {
            for (let j = 0; j < item.data.length; j++) {
                let lerpedColor = lerpColor(color(255, 0, 0), color(0, 255, 0), j / item.data.length);
                fill(lerpedColor);
                ellipse(item.data[j].x, item.data[j].y, 5, 5);
            }
        } else if (item.effect === 'pattern') {
            for (let j = 0; j < item.data.length; j++) {
                if (j % 2 === 0) {
                    fill(255, 0, 0);
                    ellipse(item.data[j].x, item.data[j].y, 5, 5);
                } else {
                    fill(255);
                    rect(item.data[j].x - 2.5, item.data[j].y - 2.5, 5, 5);
                }
            }
        } else if (item.effect === 'wave') {
            fill(255, 0, 0);
            for (let p of item.data) {
                let offsetY = sin(p.x * 0.05 + millis() * 0.002) * 5;
                ellipse(p.x, p.y + offsetY, 5, 5);
            }
        } else if (item.effect === 'scatter') {
            fill(255, 0, 0);
            for (let p of item.data) {
                let offsetX = random(-2, 2);
                let offsetY = random(-2, 2);
                ellipse(p.x + offsetX, p.y + offsetY, 5, 5);
            }
        }
    }
}