let trails = [];
let colorPalette;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPalette = [
    color('#991B36'),
    color('#CE1B27')
  ];

  let clearBtn = select('#clear_button');
  
//   when button is pressed, make the trials go awayyyy 
  clearBtn.mousePressed(() => {
    trails = [];
  });
}


function draw() {
  // helps make it look like its fading away in the backgroung - transperant rectangle 
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);

  // using object trial 
  for (let t of trails) {
    t.update();
    t.display();
  }

  // if mouse is pressed, add new trail
  if (mouseIsPressed) {
    trails.push(new Trail(mouseX, mouseY));
  }
}

class Trail { // eeverything is ranodm here 
  constructor(x, y) {
    this.path = [];
    this.maxLength = 100;
    this.color = random(colorPalette);
    this.xoff = random(1000);
    this.yoff = random(1000);
  }

  update() {
    // create a smooth path - Perlin noise, mkaes random angles 
    let angle = noise(this.xoff, this.yoff) * TWO_PI * 2;
    let r = random(1, 3);
    let last = this.path[this.path.length - 1] || createVector(mouseX, mouseY);
    let newPoint = last.copy().add(p5.Vector.fromAngle(angle).mult(r));
    this.path.push(newPoint);

    // makes it squiggly  not stright 
    this.xoff += 0.01;
    this.yoff += 0.01;

    if (this.path.length > this.maxLength) {
      this.path.shift();
    }
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(1.2);
    beginShape();
    for (let v of this.path) {
      curveVertex(v.x, v.y);
    }
    endShape();

    // mirror eveything horizontally
    beginShape();
    for (let v of this.path) {
      curveVertex(width - v.x, v.y);
    }
    endShape();
  }
}
