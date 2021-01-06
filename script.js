let gameBoard = [
    ['_', '_', '_', '_'],
    ['_', '_', '_', '_'],
    ['_', '_', '_', '_'],
    ['_', '_', '_', '_']
];

drawingModule.initialize(tileClickCallback);

let bot,
    realPlayer,
    rand = Math.random(),
    enablePlayerMoves = false;

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
    let botMovee = findBestMove(gameBoard);
    console.log(botMovee);
    drawingModule.drawSymbol(botMovee.row, botMovee.col, bot);
    enablePlayerMoves = true;
}

