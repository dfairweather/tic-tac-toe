const gameBoard = (() => {
    const boardArray = [[], [], []];
    return {boardArray};
})();

const Player = (name, team) => {
    const getName = () => name;
    const getTeam = () => team;
    return {getName, getTeam}
};

const displayController = (() => {
    const player1 = Player("dexter", 'X');
    const player2 = Player("melsie", 'O');
    let currentPlayer = player1;
    let gameOver = false;
    const newGameButton = document.querySelector("#new");
    
    const container = document.querySelector(".container");
    // Draws grid based on what's currently in game board array
    const displayBoard = () => {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                const square = document.createElement("div");
                square.className = "square"
                square.dataset.i = [i];
                square.dataset.j = [j];
                square.textContent = gameBoard.boardArray[i][j];
                container.appendChild(square);
            }
        }
    }

   
    

    // clear board of child elements
    const clearBoard = () => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };
    const checkForWin = () => {
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
                console.log("X won");
                win = true;
            } else if (oCount == 3) {
                console.log("O won");
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
                console.log("X won");
                win = true;
            } else if (oCount == 3) {
                console.log("O won");
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
                console.log("X won");
                win = true;
            } else if (oCount == 3) {
                console.log("O won");
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
                console.log("X won");
                win = true;
            } else if (oCount == 3) {
                console.log("O won");
            }
        }
    }

    // Add event listeners for taking a turn
    const takeTurn = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                const i = square.dataset.i;
                const j = square.dataset.j;
                if (!gameBoard.boardArray[i][j]) {
                    gameBoard.boardArray[i][j] = currentPlayer.getTeam();
                    square.textContent = currentPlayer.getTeam();
                    if (currentPlayer == player1) {
                        currentPlayer = player2;
                    } else {
                        currentPlayer = player1;
                    }
                } 
                checkForWin();
            })
        })
    };
    // Start a new game
    const newGame = () => {
        gameBoard.boardArray = [[], [], []];
        clearBoard();
        displayBoard();
        takeTurn();
    };
    newGameButton.addEventListener('click', newGame);
    return {displayBoard, newGame, clearBoard, takeTurn};
})();

displayController.newGame()