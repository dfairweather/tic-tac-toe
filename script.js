const gameBoard = (() => {
    const boardArray = [[], [], []];
    const container = document.querySelector(".container");
    
    // Draws grid based on what's currently in game board array
    const displayBoard = () => {
        //result = document.querySelector("#result");
        //result.textContent = "Computer wins";
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                const square = document.createElement("div");
                square.className = "square";
                square.dataset.i = [i];
                square.dataset.j = [j];
                square.textContent = gameBoard.boardArray[i][j];
                if (i == 0) {
                    square.style.borderBottom = "2px solid";
                }
                if (j == 0) {
                    square.style.borderRight = "2px solid";
                }
                if (i == 1) {
                    square.style.borderBottom = "2px solid";
                }
                if (j == 1) {
                    square.style.borderRight = "2px solid";
                }
                container.appendChild(square);
            }
        }
    };
    // Clear board of child elements
    const clearBoard = () => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };
    return {boardArray, displayBoard, clearBoard};
})();

const Player = (name, team) => {
    const getName = () => name;
    const getTeam = () => team;
    return {getName, getTeam}
};

const displayController = (() => {
    const body = document.querySelector("body");
    const touch = document.querySelector("#cant-touch");
    const cat = document.querySelector("#cat");
    const player1 = Player("dexter", 'X');
    const player2 = Player("melsie", 'O');
    let currentPlayer = player1;
    let gameOver = false;
    let turnCount = 0;
    const newGameButton = document.querySelector("#new");
    let c = document.getElementById("mycanvas");
    let ctx = c.getContext("2d");
    
   
    
    // Check each row/column/diaganol for 3 in a row
    const checkForWin = () => {
        let spacesLeft = 9;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gameBoard.boardArray[i][j]){
                    spacesLeft -= 1;
                }
            }
        }
        for (i = 0; i < 3; i++) {
            let xCount = 0;
            let oCount = 0;
            for (j = 0; j < 3; j++) {
                if (gameBoard.boardArray[i][j] == 'X') {
                    xCount += 1;
                } else if (gameBoard.boardArray[i][j] == 'O') {
                    oCount += 1;
                }
            }
            if (xCount == 3) {
                return ['X', i + 1]
            } else if (oCount == 3) {
                return ['O', i + 1]
            }
        }
        for (i = 0; i < 3; i++) {
            let xCount = 0;
            let oCount = 0;
            for (j = 0; j < 3; j++) {
                if (gameBoard.boardArray[j][i] == 'X') {
                    xCount += 1;
                } else if (gameBoard.boardArray[j][i] == 'O') {
                    oCount += 1;
                }
            }
            if (xCount == 3) {
                return ['X', i + 4]
            } else if (oCount == 3) {
                return ['O', i + 4]
            }
        }  
        let xCount = 0;
        let oCount = 0;
        for (i = 0; i < 3; i++) {
            if (gameBoard.boardArray[i][i] == 'X') {
                xCount += 1;
            } else if (gameBoard.boardArray[i][i] == 'O') {
                oCount += 1;
            }
            if (xCount == 3) {
                return ['X', 7]
            } else if (oCount == 3) {
                return ['O', 7]
            }
        }
        xCount = 0;
        oCount = 0;
        for (i = 2, j = 0; i >= 0; i--, j++) {
            if (gameBoard.boardArray[i][j] == 'X') {
                xCount += 1;
            } else if (gameBoard.boardArray[i][j] == 'O') {
                oCount += 1;
            }
            if (xCount == 3) {
                return ['X', 8]
            } else if (oCount == 3) {
                return ['O', 8]
            }
        }
        if (spacesLeft == 0) {
            return ['tie', null]
            
        } else {
            return [null, null]
        }
    }

    // Add event listeners for taking a turn
    const takeTurn = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                const i = square.dataset.i;
                const j = square.dataset.j;
                if (!gameBoard.boardArray[i][j] && gameOver == false) {
                    gameBoard.boardArray[i][j] = player1.getTeam();
                    square.textContent = player1.getTeam();
                    /* if (currentPlayer == player1) {
                        currentPlayer = player2;
                    } else {
                        currentPlayer = player1;
                    } */
                    turnCount += 1;
                    if (turnCount >= 5) {
                        if (checkForWin()[0] != null) {
                            gameOver = true;
                            const result = document.querySelector("#result");
                            if (checkForWin()[0] != 'tie'){
                                result.textContent = checkForWin()[0] + " WINS!!";
                                drawLine(checkForWin()[1]);
                                body.classList.add("animate");
                                touch.currentTime = 1.3;
                                touch.play();
                            } else {
                                cat.currentTime = 0;
                                cat.play();
                                result.textContent = "Cat's game. Try again.";
                            }
                        }   
                    }
                gameBoard.clearBoard();
                gameBoard.displayBoard();     
                    if (!gameOver){
                        bestMove();
                    }  
                }   
            })
        })
    };

    const bestMove = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++ ) {
                if (!gameBoard.boardArray[i][j]) {
                    gameBoard.boardArray[i][j] = player2.getTeam();
                    let score = minimax(gameBoard.boardArray, 0, false);
                    gameBoard.boardArray[i][j] = ''
                    if (score > bestScore) {
                        bestScore = score;
                        move = {i , j};
                    }
                }
            }
        }
        gameBoard.boardArray[move.i][move.j] = player2.getTeam();
        gameBoard.clearBoard();
        gameBoard.displayBoard();
        /* if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        } */
        turnCount += 1;
        if (checkForWin()[0] != null) {
            gameOver = true;
            const result = document.querySelector("#result");
            if (checkForWin()[0] != 'tie'){
                result.textContent = checkForWin()[0] + " WINS!!";
                
                body.classList.add("animate");
                drawLine(checkForWin()[1]);
                touch.currentTime = 1.3;
                touch.play();
            } else {
                result.textContent = "Cat's game. Try again."
                cat.currentTime = 0;
                cat.play();
            }
           
            
            
        }
        if (!gameOver){
        takeTurn();
        }
        
    }

    const scores = {
        X: -1,
        O: 1,
        tie: 0
    };

    const minimax = (board, depth, isMaximizing) => {
        let result = checkForWin()[0];
        if (result !== null) {
            let score = scores[result];
            return score
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++ ) {
                    if (!gameBoard.boardArray[i][j]) {
                        gameBoard.boardArray[i][j] = player2.getTeam();
                        let score = minimax(board, depth + 1, false);
                        gameBoard.boardArray[i][j] = '';
                        if (score > bestScore) {
                            bestScore = score;
                        }
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++ ) {
                    if (!gameBoard.boardArray[i][j]) {
                        /* if (currentPlayer == player1) {
                            currentPlayer = player2;
                        } else {
                            currentPlayer = player1;
                        } */
                        gameBoard.boardArray[i][j] = player1.getTeam();
                        let score = minimax(board, depth + 1, true);
                        gameBoard.boardArray[i][j] = '';
                        if ( score < bestScore) {
                            bestScore = score;
                        }
                    }
                }
            }
            return bestScore;
        }
    }

    const drawLine = (winType) => {
        let startx;
        let starty;
        let endx;
        let endy;
        switch(winType) {
            case 1: 
                startx = 25;
                starty = 50;
                endx = 275;
                endy = 50;
                break;
            case 2:
                startx = 25;
                starty = 150;
                endx = 275;
                endy = 150;
                break;
            case 3:
                startx = 25;
                starty = 250;
                endx = 275;
                endy = 250;
                break;
            case 4:
                console.log(4);
                startx = 50;
                starty = 25;
                endx = 50;
                endy = 275;
                break;
            case 5:
                console.log(4);
                startx = 150;
                starty = 25;
                endx = 150;
                endy = 275;
                break;
            case 6:
                console.log(4);
                startx = 250;
                starty = 25;
                endx = 250;
                endy = 275;
                break;
            case 7: 
                console.log(7);
                startx = 20;
                starty = 20;
                endx = 280;
                endy = 280;
                break;
            case 8: 
                console.log(7);
                startx = 280;
                starty = 20;
                endx = 20;
                endy = 280;
                break;    
            
        }


        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(endx, endy);
        ctx.stroke(); 
    }


    // Start a new game
    const newGame = () => {
        body.classList.remove("animate");
        touch.pause();
        cat.pause();
        result.textContent = "";
        gameOver = false;
        turnCount = 0;
        gameBoard.boardArray = [[], [], []];
        ctx.clearRect(0, 0, 300, 300);
        gameBoard.clearBoard();
        gameBoard.displayBoard();
        takeTurn();   
        
    };

    newGameButton.addEventListener('click', newGame);
    return {newGame, bestMove, takeTurn, checkForWin};
})();
 
displayController.newGame()
/*
let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(25, 50);
ctx.lineTo(275, 50);
ctx.stroke(); 
 */
