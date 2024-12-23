
//creating gameboard

let board = [];

function gameBoard() {
    let rows = 3
    let columns = 3
    

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push('');
        }
    }
    console.log(board);
}

function gameStatus(){
    for(let i = 0; i < board.length; i++){
        console.log(board[i]);
        for(let j = 0; j < board[i].length; j++){
            console.log(board[i][j]);
        }
    }
}

const playerOne = {
    name: "tim",
    mark: "x"
};

const playerTwo = {
    name: "jenn",
    mark: "o"
}