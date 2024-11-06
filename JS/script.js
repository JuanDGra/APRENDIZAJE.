const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const playerDisplay = document.getElementById('player');
const resetButton = document.getElementById('reset');

const xWinsDisplay = document.getElementById('x-wins');
const oWinsDisplay = document.getElementById('o-wins');
const drawsDisplay = document.getElementById('draws');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

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

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    
    // Añadir el símbolo y la clase correspondiente
    if (currentPlayer === "X") {
        clickedCell.textContent = "X";
        clickedCell.classList.add("x-color");
    } else {
        clickedCell.textContent = "O";
        clickedCell.classList.add("o-color");
    }

    checkResult();
    switchPlayer();
}


function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.textContent = currentPlayer;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `¡Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "¡Tie!";
        updateScore("draw");
        gameActive = false;
        return;
    }
}

function updateScore(winner) {
    if (winner === "X") {
        xWins++;
        xWinsDisplay.textContent = xWins;
    } else if (winner === "O") {
        oWins++;
        oWinsDisplay.textContent = oWins;
    } else if (winner === "draw") {
        draws++;
        drawsDisplay.textContent = draws;
    }
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    playerDisplay.textContent = currentPlayer;
    statusText.textContent = `Player´s turn: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-color", "o-color"); // Eliminar clases de colores
    });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
