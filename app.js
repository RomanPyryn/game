let currentPlayer = 0;
let playerColors = ["black", "white", "yellow"];
let playerPositions = [0, 0, 0];
let boardSize = 50;
let playerCount = 1;
const controlSelect = document.querySelector(".control__select");
const courseRang = document.querySelector(".course__rang");
const courseSelect = document.querySelector(".course");
const playersDiv = document.querySelector(".players");

function startGame() {
  controlSelect.style.display = "none";
  courseSelect.style.display = "block";
  playerCount = parseInt(document.getElementById("playerCount").value);
  currentPlayer = Math.floor(Math.random() * playerCount);
  for (let i = 1; i <= 3; i++) {
    const playerElement = document.querySelector(`.player${i}`);
    if (i <= playerCount) {
      playerElement.style.display = "block";
    } else {
      playerElement.style.display = "none";
    }
  }
  createBoard();
}

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  const mapPositions = generateUniqueRandomPositions(10, boardSize);
  const trapPositions = generateUniqueRandomPositions(10, boardSize);
  for (let i = 1; i <= boardSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    if (mapPositions.includes(i)) {
      cell.classList.add("map");
    } else if (trapPositions.includes(i)) {
      cell.classList.add("trap");
    }
    board.appendChild(cell);
  }
  updatePlayerPositions();
}

function generateUniqueRandomPositions(count, maxPosition) {
  const positions = [];
  while (positions.length < count) {
    const randomPosition = Math.floor(Math.random() * maxPosition) + 1;
    if (!positions.includes(randomPosition)) {
      positions.push(randomPosition);
    }
  }
  return positions;
}


function updatePlayerPositions() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("player1", "player2", "player3");
  }
  for (let i = 0; i < playerCount; i++) {
    const position = playerPositions[i];
    if (position <= boardSize) {
      const playerClass = "player" + (i + 1);
      cells[position - 1].classList.add(playerClass);
    }
  }
}

function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  playerPositions[currentPlayer] += diceValue;
  if (playerPositions[currentPlayer] >= boardSize) {
    alert(`Гравець ${currentPlayer + 1} переміг!`);
    return;
  }
  courseRang.textContent = diceValue;
  currentPlayer = (currentPlayer + 1) % playerCount;
  updatePlayerPositions();
}

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    event.preventDefault();
    rollDice();
  }
});

function resetGame() {
  currentPlayer = 0;
  playerPositions = [0, 0, 0];
  courseRang.textContent = "-";
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  }
  const playerCountSelect = document.getElementById("playerCount");
  playerCountSelect.disabled = false;
  controlSelect.style.display = "block";
  courseSelect.style.display = "none";
  for (let i = 1; i <= 3; i++) {
    const playerElement = document.querySelector(`.player${i}`);
    playerElement.style.display = "none";
  }
  const board = document.getElementById("board");
  board.innerHTML = "";
}