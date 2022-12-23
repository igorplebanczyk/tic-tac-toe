const start = document.querySelector(".start");
const start__button = document.querySelector(".start__button");
const game = document.querySelector(".game");
const game__board__element = document.querySelectorAll(".game__board__element");

function createDiv(parentElement, classAttribute) {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");

    element1.setAttribute("class", classAttribute);
    element2.setAttribute("class", classAttribute);

    parentElement.append(element1);
    parentElement.append(element2);
}

start__button.addEventListener("click", () => {
    start.setAttribute("style", "height: 18vh")
    start__button.remove();
    game.setAttribute("style", "visibility: visible");
});

let counter = 0;
let board = new Array(9);

game__board__element.forEach(item => item.addEventListener("click", () => {
    if (counter % 2 == 0) {
        createDiv(item, "game__board__element__circle");
        board[item.id] = 0;
        counter++;
    } else {
        createDiv(item, "game__board__element__cross");
        board[item.id] = 1;
        counter++;
    }

    console.log(board);

    // if (board[0] == board[1] == board[2] ||
    //     board[3] == board[4] == board[5] ||
    //     board[6] == board[7] == board[8] ||
    //     board[0] == board[3] == board[6] ||
    //     board[1] == board[4] == board[7] ||
    //     board[2] == board[5] == board[8] ||
    //     board[1] == board[5] == board[8] ||
    //     board[2] == board[5] == board[6]) {
    //         console.log(`${counter % 2} wins!`);
    // }
}));