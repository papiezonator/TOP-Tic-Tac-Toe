
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
};

function gameplay(){
    let state;
    let firstPlayer
    let secondPlayer
    let row1 = board[0];
    let row2 = board[1];
    let row3 = board[2];
    
    //choosing the starting player

    while(firstPlayer != playerOne.name && firstPlayer != playerTwo.name){
        firstPlayer = prompt("Who will start the game?");  
    }
    if(firstPlayer === playerOne.name){
        firstPlayer = playerOne;
        secondPlayer = playerTwo;
    } else {
        firstPlayer = playerTwo;
        secondPlayer = playerOne;
    }

    console.log(`The first player is: ${firstPlayer.name}, the second one: ${secondPlayer.name}. Enjoy your game!`);
    console.log(`Your marks are: ${firstPlayer.name}, ${firstPlayer.mark} and ${secondPlayer.name}, ${secondPlayer.mark}`);
    
    //the actual gameplay

    while(state != "finished"){
    
        //rounds

        rounds(firstPlayer);
        rounds(secondPlayer);
        state = 'finished';
        }
          
    }

    function rounds(currentPlayer){
        let row = prompt(`${currentPlayer.name}, please choose a row`)
        let column = prompt(`${currentPlayer.name}, please choose a column`)
        board[row-1].splice(column-1, 1, currentPlayer.mark);
        gameStatus()
    }
