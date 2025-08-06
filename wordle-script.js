const WORD_TO_GUESS = "CRANE";
const MAX_ATTEMPTS = 6;
let currentAttempt = 0;
let currentGuess = "";

const board = document.getElementById("game-board");
const message = document.getElementById("message");

// Create the game board
for (let i = 0; i < MAX_ATTEMPTS; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }
  board.appendChild(row);
}

// Listen to key presses
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  if (currentAttempt >= MAX_ATTEMPTS) return;

  const key = e.key.toUpperCase();

  if (key === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (key === "ENTER") {
    if (currentGuess.length === 5) {
      submitGuess();
    } else {
      message.textContent = "Guess must be 5 letters!";
    }
  } else if (/^[A-Z]$/.test(key)) {
    if (currentGuess.length < 5) {
      currentGuess += key;
    }
  }

  updateTiles();
}

function updateTiles() {
  const row = board.children[currentAttempt];
  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    tile.textContent = currentGuess[i] || "";
  }
}

function submitGuess() {
  const guess = currentGuess.toUpperCase();
  const row = board.children[currentAttempt];

  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    const letter = guess[i];

    if (letter === WORD_TO_GUESS[i]) {
      tile.classList.add("correct");
    } else if (WORD_TO_GUESS.includes(letter)) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }

  if (guess === WORD_TO_GUESS) {
    message.textContent = "🎉 Correct! You win!";
    document.removeEventListener("keydown", handleKeyPress);
    return;
  }

  currentAttempt++;
  currentGuess = "";

  if (currentAttempt === MAX_ATTEMPTS) {
    message.textContent = `❌ Game Over! The word was ${WORD_TO_GUESS}`;
    document.removeEventListener("keydown", handleKeyPress);
  }
}
