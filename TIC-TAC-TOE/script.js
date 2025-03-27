const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // If cell is already filled or game is over, return
    if (boardState[cellIndex] !== "" || !gameActive) return;

    // Update board state
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a winner or draw
    checkGameResult();

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) {
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Function to check game result
function checkGameResult() {
    let winner = null;

    // Check for a winning combination
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            winner = boardState[a];
            break;
        }
    }

    if (winner) {
        gameActive = false;
        statusText.textContent = `Player ${winner} Wins! 🎉`;
        return;
    }

    // Check for a draw
    if (!boardState.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw! 🤝";
    }
}

// Function to restart the game
function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's Turn`;

    cells.forEach(cell => (cell.textContent = ""));
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
