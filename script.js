let gameBoard,
    bot,
    realPlayer,
    enablePlayerMoves = false;

resetBoard();
drawingModule.initialize(tileClickCallback).then(() => {
    startGame();
});

function startGame() {
    let rand = Math.random();

    resetBoard();

    if (rand > 0.5) {

        realPlayer = 'x';
        bot = 'o';

        enablePlayerMoves = true;

    } else {
        realPlayer = 'o';
        bot = 'x';

        enablePlayerMoves = false;
        botMove();
    }
    document.getElementById('currentPlayerSpan').innerText = realPlayer.toUpperCase();
}

function resetBoard() {
    gameBoard = [
        ['_', '_', '_', '_'],
        ['_', '_', '_', '_'],
        ['_', '_', '_', '_'],
        ['_', '_', '_', '_']
    ];
}

function tileClickCallback(row, col) {
    console.log('tileClickCallback');
    if (!enablePlayerMoves) {
        console.log('Wait for your turn to play');
        return;
    } else {
        // disables listening for clicks on non-empty fields
        if (gameBoard[row][col] !== '_') {
            console.log(`The field [${row}, ${col}] is occuppied by the symbol ${gameBoard[row][col].toUpperCase()}`);
            return;
        }
        gameBoard[row][col] = realPlayer;
        drawingModule.drawSymbol(row, col, realPlayer);

        enablePlayerMoves = false;

        botMove();
    }

}

function botMove() {
    // let botMovee = findBestMove(gameBoard);
    let botMove = randomBotMove();
    console.log(botMove);
    gameBoard[botMove.row][botMove.col] = bot;
    drawingModule.drawSymbol(botMove.row, botMove.col, bot);

    setTimeout(() => {
        checkWinner();
        enablePlayerMoves = true;

    }, 100);
}

function randomBotMove() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (gameBoard[row][col] === '_') {
                return { row, col };
            }
        }
    }
}

function checkWinner() {
    let eval = evaluate(gameBoard);

    if (eval === 10) {
        alert('The player won!')
    } else if (eval === -10) {
        alert('The bot won!')
    } else if (!isMovesLeft(gameBoard)) {
        alert('It\'s a draw!')
    }
}