const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
        drawWinningLine();
    } else if (checkDraw()) {
        gameActive = false;
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function drawWinningLine() {
    const winningCombo = winningCombinations.find(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });

    if (!winningCombo) return;

    const lineElement = document.createElement('div');
    lineElement.classList.add('winning-line');

    const [start, middle, end] = winningCombo;
    const cellSize = 100; // px
    const cellGap = 5; // px
    const lineThickness = 5; // px
    const boardSize = 3 * cellSize + 2 * cellGap;

    // Check the winning combination directly
    if (winningCombo.toString() === [0, 1, 2].toString() || 
        winningCombo.toString() === [3, 4, 5].toString() || 
        winningCombo.toString() === [6, 7, 8].toString()) {
        // Horizontal line
        lineElement.classList.add('horizontal');
        lineElement.style.top = `${Math.floor(start / 3) * (cellSize + cellGap) + cellSize / 2 - lineThickness / 2}px`;
        lineElement.style.left = '0'; // start from the left
        lineElement.style.width = `${boardSize}px`;
    } else if (winningCombo.toString() === [0, 3, 6].toString() || 
               winningCombo.toString() === [1, 4, 7].toString() || 
               winningCombo.toString() === [2, 5, 8].toString()) {
        // Vertical line
        lineElement.classList.add('vertical');
        lineElement.style.left = `${(start % 3) * (cellSize + cellGap) + cellSize / 2 - lineThickness / 2}px`;
        lineElement.style.top = '0'; // start from the top
        lineElement.style.height = `${boardSize}px`;
    } else if (winningCombo.toString() === [0, 4, 8].toString()) {
        // Diagonal from top-left to bottom-right
        lineElement.classList.add('diagonal-1');
        lineElement.style.width = `${Math.sqrt(2) * boardSize}px`; // Diagonal length
        lineElement.style.transform = `rotate(45deg)`;
        lineElement.style.top = `${cellGap}px`; // Adjust top position for rotation
        lineElement.style.left = `${cellGap}px`; // Adjust left position for rotation
    } else if (winningCombo.toString() === [2, 4, 6].toString()) {
        // Diagonal from top-right to bottom-left
        lineElement.classList.add('diagonal-2');
        lineElement.style.width = `${Math.sqrt(2) * boardSize}px`; // Diagonal length
        lineElement.style.transform = `rotate(-45deg)`;
        lineElement.style.top = `${cellGap}px`; // Adjust top position for rotation
        lineElement.style.left = `${boardSize - (cellSize + cellGap) - lineThickness + cellGap}px`; // Correct left position
    }

    board.appendChild(lineElement);

    // Trigger reflow to ensure the transition works
    lineElement.offsetWidth;

    // Set the final dimensions for the winning line
    if (lineElement.classList.contains('horizontal')) {
        lineElement.style.width = `${boardSize}px`;
    } else if (lineElement.classList.contains('vertical')) {
        lineElement.style.height = `${boardSize}px`;
    } else {
        lineElement.style.width = `${Math.sqrt(2) * boardSize}px`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    const winningLine = document.querySelector('.winning-line');
    if (winningLine) {
        winningLine.remove();
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

// Initialize the game
message.textContent = `Player ${currentPlayer}'s turn`;