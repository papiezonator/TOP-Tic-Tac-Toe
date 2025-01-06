
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
            tr.className = "itemWrapper";
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
    div.appendChild(h1);
    div.className = "welcomeMessage";
    document.body.insertAdjacentElement("beforebegin", div);
    let firstPlayer = playerOne;
    let secondPlayer = playerTwo;
    h1.innerHTML = `Welcome ${playerOne.name} and ${playerTwo.name}!`;
    let items = document.querySelectorAll(".item");
    
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener('click', () => {
            function test(currentPlayer){
                let itemWrapper = document.querySelectorAll(".itemWrapper");
                for(let x = 0; x < itemWrapper.length; x++){
                        for(let j = 0; j < itemWrapper[x].children.length ; j++){
                        let childrenArray = Array.from(itemWrapper[x].children);    
                        board[x][j] = childrenArray[j].innerHTML;
                    }   
                } 
                console.log(board);  
            }

            function marker(firstPlayer, secondPlayer){
                if(currentPlayer === 0 && items[i].innerHTML != 'O' ){
                    items[i].innerHTML = firstPlayer.mark.toUpperCase();
                    //console.log(itemWrapper[i].children)
                    test(firstPlayer);
                    currentPlayer++
                } else if (currentPlayer === 1 && items[i].innerHTML != 'X'){
                    items[i].innerHTML = secondPlayer.mark.toUpperCase();
                    //test(secondPlayer);
                    test(secondPlayer);
                    currentPlayer--
                }
            }        
            marker(firstPlayer, secondPlayer);
        })
    }
}

    