// We recover the content of the HTML elements
const boardStatus = document.querySelector(".boardStatus");
const boardTimer = document.querySelector(".boardTimer");
const boardTimerText = document.querySelector(".boardTimerText");
const scoreXText = document.querySelector(".scoreX");
const scoreOText = document.querySelector(".scoreO");

let playerPawn = "X";
let board = ["", "", "", "", "", "", "", "", ""];

// Scores
let scoreX = 0;
let scoreO = 0;

// We set the timer back to 3:00
const startGameTime = 3;
let time = startGameTime * 60;

setInterval(() => {
  let min = parseInt(time / 60, 10);
  let sec = parseInt(time % 60, 10);

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  boardTimer.innerText = `${min}:${sec}`;
  time = time <= 0 ? 0 : time - 1;

  // We restart the game if the timer is over
  if (time < 1) {
    if (scoreX === scoreO) {
      boardTimerText.innerHTML = "It's a tie!";

    }
    else if (scoreX > scoreO) {
      boardTimerText.innerHTML = "Player X won the game!";
    }
    else {
      boardTimerText.innerHTML = "Player O won the game!";
    }

    restartGame();
  }
}, 1000)

// The different combinations to win,using the cells' indexes
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// We display the player's pawn
function displayPlayerPawn(cell, index) {
  board[index] = playerPawn;
  cell.innerHTML = playerPawn;
}

// We restart the game
function restartGame() {
  playerPawn = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// We check which player's turn it is
function changePlayerTurn() {
  if (playerPawn === "X") {
    playerPawn = "O";
  }
  else {
    playerPawn = "X"
  }
  boardStatus.innerHTML = `${playerPawn}'s turn`;
}

// We check if there is a win or a loss
function checkBoardWin() {
  let isGameWon = false;
  // Check if we have one of the winning combinations
  for (let i = 0; i <= 7; i++) {
    const winCombination = winningCombinations[i];
    const cell1 = board[winCombination[0]];
    const cell2 = board[winCombination[1]];
    const cell3 = board[winCombination[2]];

    if (cell1 === '' || cell2 === '' || cell3 === '') {
      continue;
    }
    if (cell1 === cell2 && cell1 === cell3) {
      isGameWon = true;
      break;
    }
  }

  // Display message if game won
  if (isGameWon) {
    boardStatus.innerHTML = `Player ${playerPawn} won!`;
    if (playerPawn === 'X') {
      scoreX += 1;
      scoreXText.innerHTML = scoreX;
    }
    else {
      scoreO += 1;
      scoreOText.innerHTML = scoreO;
    }
    setTimeout(() => { restartGame(); }, 500);
    return;
  }

  // If nobody won, we check if the board still has empty cells
  if (!board.includes("")) {
    boardStatus.innerHTML = "Nobody won!";
    return;
  }

  changePlayerTurn();
}

// We handle the cell click
function handleClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute('data-cell-index'));

  //if cell has already been played, do nothing
  if (board[index] !== "") return;

  //if cell has not been played yet
  displayPlayerPawn(cell, index);
  checkBoardWin();
}

// We display which player's turn it is
boardStatus.innerHTML = `${playerPawn}'s turn`;

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
