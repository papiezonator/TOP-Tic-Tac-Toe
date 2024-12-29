
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

//checking game's status

function gameStatus(){
    for(let i = 0; i < board.length; i++){
        console.log(board[i]);
        /*for(let j = 0; j < board[i].length; j++){
            console.log(board[i][j]);
        }*/
    }
}

//player variables

const playerOne = {
    name: "tim",
    mark: "x"
};

const playerTwo = {
    name: "jenn",
    mark: "o"
}

function gameplay(){
    let state;
    let row1 = board[0];
    let row2 = board[1];
    let row3 = board[2];
    while(state != "finished"){
        let test = prompt("x?");
        let row = prompt("which row?");
        let column = prompt("which column?")
        if(test === 'x'){
            board[row-1].splice(column-1, 1, test);
            state = 'finished';
            console.log(playerOne.mark, playerTwo.mark); 
            gameStatus();
            return;
        }   
    }

}