let emotion = null;
let canvasCreated = false;
let emotionCircles = [];
let showQuote = false;
let currentQuote = "";

const quotes = {
  joyful: [
    "Joy multiplies when it is shared",
    "Joy is a flower that blooms every time you smile",
    "Joy is a net of love by which you can catch souls",
    "Where there is love, there is joy",
    "Let your joy be contagious",
    "Joy is not in things; it is in us"
  ],
  
  sad: [
    "Tears are words that need to be written",
    "Sadness is just a wall between two gardens",
    "Sadness flies away on the wings of time",
    "Sadness gives depth. Happiness gives height",
    "Sometimes, sadness is just love left unspoken",
    "It's okay to not be okay" 
  ],
  
  angry: [
    "Inhale peace. Exhale stress",
    "Just breathe. You are strong enough to handle this",
    "Peace begins with a deep breath",
    "Within you, there is a stillness and a sanctuary",
    "Relax. Nothing is under control", 
    "Sometimes the most productive thing you can do is relax"
  ],
  
  anxious: [
    "Worry is a misuse of imagination",
    "Anxiety is the dizziness of freedom",
    "Feel the fear and do it anyway",
    "Be gentle with yourself. You’re doing the best you can",
    "Your anxiety is lying to you",
    "It’s okay to not have it all figured out" 
  ]
  
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // Select all buttons and add event listeners
  document.querySelectorAll(".emotion-btn").forEach(button => {
    button.addEventListener("click", () => {
      emotion = button.getAttribute("data-emotion");
      document.getElementById("interface").style.display = "none"; // Hide the UI
      clear();
      generateEmotionCircles(emotion);
      loop();

      // Select a random quote for the chosen emotion
      currentQuote = random(quotes[emotion.toLowerCase()]);
      
      // Show the quote after 5 seconds
      setTimeout(() => {
        showQuote = true;
      }, 2500); // Delay of 5000ms (5 seconds)
    });
  });
}

function draw() {
  if (emotion) {
    background(255, 255, 255); // soft trail effect

    for (let circle of emotionCircles) {
      fill(circle.color);
      noStroke();
      ellipse(circle.x, circle.y, circle.size);
      circle.x += circle.vx;
      circle.y += circle.vy;

      // Bounce effect
      if (circle.x < 0 || circle.x > width) circle.vx *= -1;
      if (circle.y < 0 || circle.y > height) circle.vy *= -1;
    }

    // Show the quote after 5 seconds in the center of the canvas
    if (showQuote) {
      fill(0); // Black text
      textSize(24); // Start with a smaller font size
      textAlign(CENTER, CENTER);

      // Display the quote at a fixed position, centered on the screen
      text(currentQuote, width / 2, height / 2); 
    }
  }
}

function generateEmotionCircles(feeling) {
  emotionCircles = [];
  let numCircles = int(random(50, 70)); // Random number of circles per session
  let colorPalette;

  switch (feeling) {
    case "joyful":
      colorPalette = () => color(random(220, 255), random(200, 255), random(50, 100), 200);
      break;
    case "sad":
      colorPalette = () => color(random(50, 120), random(100, 150), random(200, 255), 200);
      break;
    case "angry":
      colorPalette = () => color(random(200, 255), random(0, 100), random(0, 50), 200);
      break;
    case "anxious":
      colorPalette = () => color(random(100, 180), random(50, 100), random(150, 255), 200);
      break;
    default:
      colorPalette = () => color(200); // Gray fallback
  }

  for (let i = 0; i < numCircles; i++) {
    emotionCircles.push({
      x: random(width),
      y: random(height),
      size: random(20, 60),
      vx: random(-1.5, 1.5),
      vy: random(-1.5, 1.5),
      color: colorPalette()
    });
  }
}

