
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
    div.className = "tableWrapper";
    document.body.appendChild(div);

    

    for(let i = 0; i < rows; i++){
        board[i] = [];
        const tr = document.createElement("tr");
        tr.className = "row";
        for(let j = 0; j < columns; j++){
            board[i].push('');
            const th = document.createElement("th");
            tr.appendChild(th);
            tr.className = "ItemWrapper";
            th.innerHTML = board[i][j];
            th.className = "item";
            
            

        }
        
        table.appendChild(tr);
        table.className = "mainTable";
    }
    gameplay();
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
    let currentPlayer = 0;
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let tableWrapper = document.querySelector(".tableWrapper");
    div.appendChild(h1);
    div.className = "welcomeMessage";
    document.body.insertAdjacentElement("beforebegin", div);
    
    let firstPlayer = playerOne;
    let secondPlayer = playerTwo;
    h1.innerHTML = `Welcome ${playerOne.name} and ${playerTwo.name}!`;

    let items = document.querySelectorAll(".item");
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener('click', () => {
            function marker(firstPlayer, secondPlayer){
                
                if(currentPlayer === 0 && items[i].innerHTML != 'o' ){
                    items[i].innerHTML = firstPlayer.mark;
                    currentPlayer++
                } else if (currentPlayer === 1 && items[i].innerHTML != 'x'){
                    items[i].innerHTML = secondPlayer.mark
                    currentPlayer--
                }
                
            }        
            
            marker(firstPlayer, secondPlayer);
        })
    }
    

    /*let state;
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
        }*/
          
    /*}
    
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
    */ 
}

    