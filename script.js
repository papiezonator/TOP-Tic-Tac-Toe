
//creating gameboard

const submitBtn = document.querySelector("#submitBtn");
const playerForm = document.querySelector("#playerForm");

const createFirstP = (playerName) => {
    const name = playerName;
    const mark = "x";
    const score = 0;
    return {name, mark, score};
}
const createSecondP = (playerName) => {
    const name = playerName;
    const mark = "o";
    const score = 0;
    return {name, mark, score};
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const firstInput = document.querySelector("#firstPlayer");
    const secondInput = document.querySelector("#secondPlayer");
    const welcomeDiv = document.querySelector("#welcome");
    
    if(firstInput.value != '' && secondInput.value != ''){
        const playerOne = createFirstP(firstInput.value)
        const playerTwo = createSecondP(secondInput.value)
        const div = document.createElement("div");
        gameBoard(div, playerOne, playerTwo);
        document.body.removeChild(playerForm);
        document.body.removeChild(welcomeDiv);

    } 
})




let board = [];

function gameBoard(div, playerOne, playerTwo) {
    //used variables
    //const div = document.createElement("div");
    const table = document.createElement("table");
    
    let rows = 3
    let columns = 3
    
    div.appendChild(table);
    div.className = "tableWrapper";
    document.body.appendChild(div);

    

    for(let i = 0; i < rows; i++){
        board[i] = [];
        const tr = document.createElement("tr");
        for(let j = 0; j < columns; j++){
            board[i].push('');
            const th = document.createElement("th");
            tr.appendChild(th);
            tr.className = "itemWrapper";
            th.textContent = board[i][j];
            th.className = "item";
            
        }
        
        table.appendChild(tr);
        table.className = "mainTable";
    }
    gameplay(playerOne, playerTwo);
}

function gameplay(playerOne, playerTwo){
    //creating the welcoming message
    /*let welcomeDiv = document.createElement("div");
    let h1 = document.createElement("h1");
    welcomeDiv.appendChild(h1);
    welcomeDiv.className = "welcomeMessage";
    document.body.appendChild(welcomeDiv);
    h1.textContent = `Welcome ${playerOne.name} and ${playerTwo.name}!`;*/
    let firstPlayer = playerOne;    
    let secondPlayer = playerTwo;
    let gamestatus = {state: "ongoing"};
    //the actual gameplay
    playRound(firstPlayer, secondPlayer, gamestatus);
        
}

function playRound(firstPlayer, secondPlayer, gamestatus){
    let roundCheck = 0;
    let items = document.querySelectorAll(".item");
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener('click', () => {

            //adding the clicked element to the board array
            function boardPush(){
                let itemWrapper = document.querySelectorAll(".itemWrapper");
                for(let x = 0; x < itemWrapper.length; x++){
                        for(let j = 0; j < itemWrapper[x].children.length ; j++){
                        let childrenArray = Array.from(itemWrapper[x].children);    
                        board[x][j] = childrenArray[j].textContent;
                    }   
                } 
            }
            //adding the players marker to the table elements
            function marker(firstPlayer, secondPlayer){
                if(roundCheck === 0 && items[i].textContent != 'O' && gamestatus.state != "end" ){
                    items[i].textContent = firstPlayer.mark.toUpperCase();
                    boardPush();
                    roundCheck++
                } else if (roundCheck === 1 && items[i].textContent != 'X' && gamestatus.state != "end"){
                    items[i].textContent = secondPlayer.mark.toUpperCase();
                    boardPush();
                    roundCheck--
                } else if (gamestatus.state === "end"){
                    return;
                }
            }        
            marker(firstPlayer, secondPlayer);
            gameWin(firstPlayer, secondPlayer, gamestatus);
        })
    }
    return;
}

function gameWin(firstPlayer, secondPlayer, gamestatus){
    //possible winning combinations
    if(gamestatus.state != "end"){
        let arr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3 ,6],
            [1, 4 ,7],
            [2, 5, 8]
        ]

        //row/column array made into a single one 
        const winArray = []
        const arrayPush = (() => {
            board.forEach((arrayRow) => {
                arrayRow.forEach((item) => {
                    winArray.push(item);
                })
            })
        }) 
        arrayPush();

        const winCheck = (() =>{
            for(let j = 0; j < arr.length; j++){
                let test = []
                for(let i = 0; i < 3; i++){
                    test.push(winArray[arr[j][i]])   
                } 
                if(test.includes(firstPlayer.mark.toUpperCase()) && !test.includes(secondPlayer.mark.toUpperCase()) && !test.includes('')){
                    firstPlayer.score++;
                    console.log(`Congratulations ${firstPlayer.name}, you won! Your score is ${firstPlayer.score}`);
                    gamestatus.state = "end";
                    endButtons(firstPlayer, secondPlayer);
                    return gamestatus.state;
                } else if(test.includes(secondPlayer.mark.toUpperCase()) && !test.includes(firstPlayer.mark.toUpperCase()) && !test.includes('')){
                    console.log(`Congratulations ${secondPlayer.name}, you won! Your score is ${secondPlayer.score}`);
                    secondPlayer.score++; 
                    gamestatus.state = "end";
                    endButtons(firstPlayer, secondPlayer);
                    return gamestatus.state;
                }   
            }    
        })
        winCheck();
        return;
    }
}

const endButtons = (firstPlayer, secondPlayer) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.className = "endButtons";
    for(let i = 0; i < 2; i++){
        const btn = document.createElement("button");
        div.appendChild(btn);
        if(i != 1){
            btn.textContent = "Play again"
            btn.className = "playAgain"
        } else {
            btn.textContent = "Restart"
            btn.className = "restart"
        }
    }
    buttonFunctionality(firstPlayer, secondPlayer, div);
}

const buttonFunctionality = (firstPlayer, secondPlayer, div) => {
    const playAgBtn = document.querySelector(".playAgain");
    playAgBtn.addEventListener("click", () => {
        //gameBoard(div, firstPlayer, secondPlayer);
        boardClear();
        console.log(playAgBtn);
    })
    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", () => {
        console.log(restartBtn);
    })
}

const boardClear = () => {
    let table = document.querySelector(".mainTable")
    for(let i = 0; i < table.childElementCount; i++){
        for(let j = 0; j < table.childNodes[i].childElementCount; j++){
            table.childNodes[i].childNodes[j].textContent = ''
        }
    }
    
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            board[i][j] = '';
        }
    }


}