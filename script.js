
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
        let test = 0;
        for(let j = 0; j < columns; j++){
            test++
            board[i].push(test);
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
    let items = document.querySelectorAll(".item");
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener('click', () => {
            console.log(items[i].innerHTML);
        })
    }
    
}

    