const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const playerDisplay = document.getElementById('player');
const resetButton = document.getElementById('reset');

const xWinsDisplay = document.getElementById('x-wins');
const oWinsDisplay = document.getElementById('o-wins');
const drawsDisplay = document.getElementById('draws');

const initialState = {
    currentPlayer: 'X',
    movements: ["", "", "", "", "", "", "", "", ""],
    gameIsActive: true,
    xWins: 0,
    oWins: 0,
    draws: 0
}

let gameState = initialState;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.textContent = gameState.currentPlayer;
}

function updateScore(winner) {
    if (winner === "X") gameState.xWins++; xWinsDisplay.textContent = gameState.xWins;
    if (winner === "O") gameState.oWins++; oWinsDisplay.textContent = gameState.oWins;
    if (winner === "draw") gameState.draws++; drawsDisplay.textContent = gameState.draws;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState.movements[a] && gameState.movements[a] === gameState.movements[b] && gameState.movements[a] === gameState.movements[c]) 
        roundWon = true;
    }

    if (roundWon) {
        statusText.textContent = `¡Player ${gameState.currentPlayer} wins!`;
        updateScore(gameState.currentPlayer);
        gameState.gameIsActive = false;
        return;
    }

    if (!gameState.movements.includes("")) {
        statusText.textContent = "¡Tie!";
        updateScore("draw");
        gameState.gameIsActive = false;
        return;
    }
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (gameState.movements[clickedIndex] !== "" || !gameState.gameIsActive) return;

    gameState.movements[clickedIndex] = gameState.currentPlayer;
    
    // Añadir el símbolo y la clase correspondiente
    if (gameState.currentPlayer === "O") { clickedCell.textContent = "O"; clickedCell.classList.add("o-color") }
    if (gameState.currentPlayer === "X") { clickedCell.textContent = "X"; clickedCell.classList.add("x-color") }

    checkResult();
    switchPlayer();
}

function resetGame() {
    gameState.movements = ["", "", "", "", "", "", "", "", ""];
    gameState.gameIsActive = true;
    gameState.currentPlayer = 'X';
    playerDisplay.textContent = gameState.currentPlayer;
    statusText.textContent = `Player´s turn: ${gameState.currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-color", "o-color"); // Eliminar clases de colores
    });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
