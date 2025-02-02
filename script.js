
//creating gameboard    

const submitBtn = document.querySelector("#submitBtn");
const playerForm = document.querySelector("#playerForm");
const welcomeDiv = document.querySelector("#welcome");

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
        getPlayers();
        const scoreboard = document.querySelector("#scoreboard");
        scoreboard.style.visibility = "visible";
    })

const getPlayers = () => {
    const firstInput = document.querySelector("#firstPlayer");
    const secondInput = document.querySelector("#secondPlayer");
    
    if(firstInput.value != '' && secondInput.value != ''){
        const playerOne = createFirstP(firstInput.value)
        const playerTwo = createSecondP(secondInput.value)
        const div = document.createElement("div");
        gameBoard(div, playerOne, playerTwo);
        playerForm.style.display = "none";
        welcomeDiv.style.display = "none";
        setPlayers(playerOne, playerTwo)
        firstInput.value = "";
        secondInput.value = "";
    }

}

const setPlayers = (playerOne, playerTwo) => {
    let playerScores = document.querySelectorAll(".playerScore");
    let playerName = document.querySelectorAll(".playerName");
    playerName[0].textContent = playerOne.name;
    playerScores[0].textContent = playerOne.score;
    playerName[1].textContent = playerTwo.name;
    playerScores[1].textContent = playerTwo.score;
}



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
    endButtons(firstPlayer, secondPlayer, gamestatus);    
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
                    roundCheck = 0;
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
    const players = document.querySelectorAll(".playerScore")
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
                    players[0].textContent = firstPlayer.score
                    console.log(`Congratulations ${firstPlayer.name}, you won! Your score is ${firstPlayer.score}`);
                    gamestatus.state = "end";
                    return gamestatus.state;
                } else if(test.includes(secondPlayer.mark.toUpperCase()) && !test.includes(firstPlayer.mark.toUpperCase()) && !test.includes('')){
                    secondPlayer.score++; 
                    players[1].textContent = secondPlayer.score
                    console.log(`Congratulations ${secondPlayer.name}, you won! Your score is ${secondPlayer.score}`);
                    gamestatus.state = "end";
                    return gamestatus.state;
                }   
            }    
        })
        winCheck();
        return;
    }
}

const endButtons = (firstPlayer, secondPlayer, gamestatus) => {
    const div = document.createElement("div");
    const body = document.body;
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
        buttonFunctionality(body, gamestatus);
      
    return;
}

const buttonFunctionality = (body, gamestatus) => {
    const playAgBtn = document.querySelector(".playAgain");
    playAgBtn.addEventListener("click", () => {
        //gameBoard(div, firstPlayer, secondPlayer);
        boardClear();
        //console.log(playAgBtn);
        return gamestatus.state = "ongoing";
    })
    const restartBtn = document.querySelector(".restart");
    const scoreboard = document.querySelector("#scoreboard")
    restartBtn.addEventListener("click", () => {
        for(let i = 1; i < body.childElementCount; i++){
            body.removeChild(body.children[body.childElementCount-1])
        }
        scoreboard.style.visibility = "hidden";
        playerForm.style.display = "flex";
        welcomeDiv.style.display = "flex";
        return gamestatus.state = "ongoing";
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
    return;
}