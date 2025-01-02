
//creating gameboard

document.body.onload = gameBoard;

let board = [];

function gameBoard() {
    //used variables
    const div = document.createElement("div");
    const table = document.createElement("table");
    
    
    let rows = 3
    let columns = 3
    
    div.appendChild(table);
    document.body.appendChild(div);

    for(let i = 0; i < rows; i++){
        board[i] = [];
        const tr = document.createElement("tr");
        for(let j = 0; j < columns; j++){
            board[i].push('');
            const th = document.createElement("th");
            tr.appendChild(th);
            
        }
        
        table.appendChild(tr);
    }
    console.log(board);
}


//checking game's status

function gameStatus(){
    for(let i = 0; i < board.length; i++){
        console.log(board[i]);
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
        let roundNumber = 0;
        rounds(firstPlayer);
        rounds(secondPlayer);
        roundNumber++;
        console.log(`Round number ${roundNumber} result:`);
        gameStatus();

        state = 'finished';
        }
          
    }

    function rounds(currentPlayer){
        
        let row;
        let column; 
        let correctPosition;
        while(correctPosition != true){
            row = prompt(`${currentPlayer.name}, please choose a row`);
            column = prompt(`${currentPlayer.name}, please choose a column`);
            if(board[row-1][column-1] != ''){
                console.log("This spot is already marked, please choose a different one");
                gameStatus();
                correctPosition = false;
            } else {
                correctPosition = true;
            }
        }
        
        board[row-1].splice(column-1, 1, currentPlayer.mark);
        gameStatus();
        console.log("");
        
    }

    