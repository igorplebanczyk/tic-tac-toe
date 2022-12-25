const start = document.querySelector(".start");
const startButton = document.querySelector(".button");

const game = document.querySelector(".game");
const game__turn = document.querySelector(".game__turn");
const game__board = document.querySelector(".game__board");
const game__board__element = document.querySelectorAll(".game__board__element");

let counter = 0;
let board = new Array(9).fill(null);

startButton.addEventListener("click", () => {
    start.setAttribute("style", "height: 15vh")
    startButton.remove();
    game.setAttribute("style", "visibility: visible");
});

function createDiv(parentElement, classAttribute) {
    const element = document.createElement("div");
    element.setAttribute("class", classAttribute);
    parentElement.append(element);
}

function checkForWin(board) {
    let won = false;
    const combinations = [        
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (i of combinations) {
        const [a, b, c] = i;

        if ((board[a] === board[b] && board[b] === board[c]) && (board[a] === 0 || board[a] === 1)) {
            game__turn.innerHTML = `Player ${board[a] + 1} wins!`;
            won = true;
        }
    }

    if (!board.includes(null) && won === false) {
        game__turn.innerHTML = "Draw!";
        won = true;
    }

    return won;
}

game__board__element.forEach(item => {
    item.addEventListener("click", () => {
        if (counter % 2 == 0) {
            createDiv(item, "game__board__element__circle");
            createDiv(item, "game__board__element__circle");

            board[item.id] = 0;
            counter++;
        } else {
            createDiv(item, "game__board__element__cross");
            createDiv(item, "game__board__element__cross");
        
            board[item.id] = 1;
            counter++;
        }
        
        if (checkForWin(board)) {
            const restartButton = document.createElement("button");
            const restartButtonText = document.createElement("span");
            
            game__board.remove();
            game__turn.innerHTML = `Player ${(counter - 1) % 2 + 1} wins`;
            game__turn.style.color = ((counter - 1) % 2 + 1) === 1 ? "blue" : "red";

            restartButton.setAttribute("class", "button");
            restartButton.addEventListener("click", () => { location.reload() });
            restartButtonText.setAttribute("class", "button__text");
            restartButtonText.innerHTML = "Restart";

            restartButton.append(restartButtonText);
            game.append(restartButton);
        } else {
            item.disabled = true;
            game__turn.innerHTML = `Player ${counter % 2 + 1}'s turn`;
            game__turn.style.color = (counter % 2 + 1) === 1 ? "blue" : "red";
        }
    }); 
});