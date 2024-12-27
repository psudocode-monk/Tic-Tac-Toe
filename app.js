let turn = "O";
let total_turn = 0;
let winner = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let board_array = new Array(9).fill("E");

function checkWinner() {
    for (let [index0, index1, index2] of winner) {
        if (board_array[index0] != "E" && board_array[index1] != "E" && board_array[index2] != "E" && board_array[index0] === board_array[index1] && board_array[index1] === board_array[index2]) {
            return true;
        }
    }
    return false;
}

const board = document.querySelector(".board");
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");

const updatePlayerStatus = () => {
    if (turn === "O") {
        playerX.classList.remove("active");
        playerX.classList.add("inactive");
        playerO.classList.remove("inactive");
        playerO.classList.add("active");
    } else {
        playerO.classList.remove("active");
        playerO.classList.add("inactive");
        playerX.classList.remove("inactive");
        playerX.classList.add("active");
    }
};

const printer = (event) => {
    const element = event.target;
    if (board_array[element.id] == "E") {
        total_turn++;
        if (turn === "O") {
            element.innerHTML = "O";
            board_array[element.id] = "O";
            if (checkWinner()) {
                document.getElementById("winningMessage").innerHTML = "Winner is Player O";
                board.removeEventListener("click", printer);
                return;
            }
            turn = "X";
        } else {
            element.innerHTML = "X";
            board_array[element.id] = "X";
            if (checkWinner()) {
                document.getElementById("winningMessage").innerHTML = "Winner is Player X";
                board.removeEventListener("click", printer);
                return;
            }
            turn = "O";
        }
        if (total_turn === 9) document.getElementById("winningMessage").innerHTML = "The Game is Draw";
        
        // Update player status after each turn
        updatePlayerStatus();
    }
}

// Initialize player status
updatePlayerStatus();

board.addEventListener("click", printer);
const restart = document.getElementById("restartButton");
restart.addEventListener("click", () => {
    const cell = document.getElementsByClassName("cell");
    Array.from(cell).forEach((value) => {
        value.innerHTML = "";
    });
    turn = "O";
    total_turn = 0;
    board_array = new Array(9).fill("E");
    document.getElementById("winningMessage").innerHTML = "";
    
    // Reset player status
    updatePlayerStatus();
    
    board.addEventListener("click", printer);
});