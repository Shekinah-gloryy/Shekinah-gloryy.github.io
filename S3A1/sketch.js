let boardCanvas, textCanvas;

let board;
let players = ['X', 'O'];
let currentPlayer;
let available = [];
let gameOver = false;
let winner = null;
let postGameClickReady = false;// update: makes sure game restarts after 2 clicks

let userPrediction = null;
let fadeDuration = 10000; // 5 seconds
let fadeProgress = {}; // Stores fade progress for each move

function setup() {
  // Create board and text p5 instances
  boardCanvas = new p5(boardSketch, 'BoardBase');
  textCanvas = new p5(textSketch, 'TextBase');

  resetGame();
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  available = [];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }

  userPrediction = prompt("Who do you think will win? Type 'X' or 'O'").toUpperCase();
  while (userPrediction !== 'X' && userPrediction !== 'O') {
    userPrediction = prompt("Invalid input! Please type 'X' or 'O'").toUpperCase();
  }

  currentPlayer = floor(random(players.length));
  gameOver = false;
  fadeProgress = {}; // Reset fade tracking
  boardCanvas.loop();
}

// Function to check for a winner
function equal3(a, b, c) {
  return a === b && b === c && a !== '';
}

function checkWinner() {
  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (equal3(board[i][0], board[i][1], board[i][2])) winner = board[i][0];
    if (equal3(board[0][i], board[1][i], board[2][i])) winner = board[0][i];
  }

  if (equal3(board[0][0], board[1][1], board[2][2])) winner = board[0][0];
  if (equal3(board[2][0], board[1][1], board[0][2])) winner = board[2][0];

  if (winner === null && available.length === 0) return 'Tie';
  return winner;
}

// Handle turns
function nextTurn() {
  if (!gameOver && available.length > 0) {
    let index = floor(random(available.length));
    let spot = available.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];

    board[i][j] = players[currentPlayer];

    // Start fade effect for this move
    fadeProgress[`${i}-${j}`] = boardCanvas.millis();

    currentPlayer = (currentPlayer + 1) % players.length;
  }
}

// **BOARD CANVAS**
let boardSketch = (p) => {
  p.setup = function () {
    p.createCanvas(400, 400);
    p.background(255);
  };

  p.draw = function () {
    p.background(255);
    let w = p.width / 3;
    let h = p.height / 3;

    p.stroke(0);
    p.line(w, 0, w, p.height);
    p.line(w * 2, 0, w * 2, p.height);
    p.line(0, h, p.width, h);
    p.line(0, h * 2, p.width, h * 2);

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];

        if (spot !== '') {
          let elapsedTime = p.millis() - (fadeProgress[`${i}-${j}`] || 0);
          let progress = p.constrain(elapsedTime / fadeDuration, 0.5, 1);
          let alphaValue = progress * 255;

          if (spot === 'O') {
            p.noFill();
            p.push();
            p.stroke(35, 186, 232, alphaValue);
            p.strokeWeight(8);
            p.ellipse(x, y, w / 2);
            p.pop();
          } else if (spot === 'X') {
            let xr = w / 4;
            p.push();
            p.stroke(255, 0, 0, alphaValue);
            p.strokeWeight(8);
            p.line(x - xr, y - xr, x + xr, y + xr);
            p.line(x + xr, y - xr, x - xr, y + xr);
            p.pop();
          }
        }
      }
    }

    let result = checkWinner();

  if (result !== null) {
    winner = result; // <-- store it
    p.noLoop();
    gameOver = true;
    textCanvas.redraw();
  }
};

  p.mousePressed = function () {
  if (gameOver) {
    if (postGameClickReady) {
      resetGame();
      postGameClickReady = false; // Reset the flag
    } else {
      postGameClickReady = true; // Wait for one more click
    }
  } else {
    nextTurn();
  }
  };
};

// **TEXT CANVAS**
let textSketch = (p) => {
  p.setup = function () {
    p.createCanvas(400, 200);
    p.background(255);
    // p.noLoop();
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);

      if (gameOver) {
    let message = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
    let predictionMessage = winner === userPrediction ? "You're right!" : "Sorry!";
    p.text(message + " " + predictionMessage, p.width / 2, p.height / 2 - 20);
        
    // p.text("RESTART?", p.width / 2, p.height / 2 + 20);
    document.getElementById('fakebutton').style.display = 'block';
  } else {
    p.text(`Turn: ${players[currentPlayer]}`, p.width / 2, p.height / 2);
    document.getElementById('fakebutton').style.display = 'none';
  }
  };
};
