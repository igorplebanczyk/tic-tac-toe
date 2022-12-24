const start = document.querySelector(".start");
const start__button = document.querySelector(".start__button");
const game = document.querySelector(".game");
const game__board__element = document.querySelectorAll(".game__board__element");

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

    for (i in combinations) {
        const [a, b, c] = combinations[i];

        if ((board[a] === board[b] && board[b] === board[c]) && (board[a] === 0 || board[a] === 1)) {
            console.log(`Player ${board[a] + 1} wins!`);
            won = true;
        }
    }

    if (!board.includes(null) && won === false) {
        console.log("Draw!");
        won = true;
    }

    return won;
}

start__button.addEventListener("click", () => {
    start.setAttribute("style", "height: 18vh")
    start__button.remove();
    game.setAttribute("style", "visibility: visible");
});

let counter = 0;
let board = new Array(9).fill(null);

game__board__element.forEach(item => {
    item.addEventListener("click", () => {
        if (counter % 2 == 0) {
            for (let i = 0; i < 2; i++) {
                createDiv(item, "game__board__element__circle");
            }
    
            board[item.id] = 0;
            counter++;
        } else {
            for (let i = 0; i < 2; i++) {
                createDiv(item, "game__board__element__cross");
            }
    
            board[item.id] = 1;
            counter++;
        }
        
        checkForWin(board) ? game__board__element.forEach(item => item.disabled = true) : item.disabled = true;
    })
});