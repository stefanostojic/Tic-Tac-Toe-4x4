// let realPlayer = 'x',
//     bot = 'o';

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board) {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            if (board[i][j] == '_')
                return true;
    return false;
}

// This is the evaluation function as discussed
// in the previous article ( http://goo.gl/sJgv68 )
function evaluate(board) {
    console.log('entering evaluate()...');
    // Checking for Rows for X or O victory.
    for (let row = 0; row < 4; row++) {
        if (board[row][0] === board[row][1] &&
            board[row][1] === board[row][2] &&
            board[row][2] === board[row][3]) {
            if (board[row][0] === realPlayer)
                return 10;
            else if (board[row][0] === bot)
                return -10;
        }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col < 4; col++) {
        if (board[0][col] === board[1][col] &&
            board[1][col] === board[2][col] &&
            board[2][col] === board[3][col]) {
            if (board[0][col] === realPlayer)
                return 10;

            else if (board[0][col] === bot)
                return -10;
        }
    }

    // Checking for Diagonals for X or O victory.
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[3][3]) {
        if (board[0][0] === realPlayer)
            return 10;
        else if (board[0][0] === bot)
            return -10;
    }

    if (board[0][3] === board[1][2] && board[1][2] === board[2][1] && board[2][1] === board[3][0]) {
        if (board[0][3] === realPlayer)
            return 10;
        else if (board[0][2] === bot)
            return -10;
    }

    // Else if none of them have won then return 0
    return 0;
}

// This is the minimax function. It considers all
// the possible ways the game can go and returns
// the value of the board
function minimax(board, depth, isMax) {
    let score = evaluate(board);

    // If Maximizer has won the game 
    // return his/her evaluated score
    if (score === 10)
        return score;

    // If Minimizer has won the game 
    // return his/her evaluated score
    if (score === -10)
        return score;

    // If there are no more moves and 
    // no winner then it is a tie
    if (isMovesLeft(board) === false)
        return 0;

    // If this maximizer's move
    if (isMax) {
        let best = -1000;

        // Traverse all cells
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                // Check if cell is empty
                if (board[row][col] === '_') {
                    // Make the move
                    board[row][col] = bot;

                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max(best, minimax(board, depth + 1, !isMax));

                    // Undo the move
                    board[row][col] = '_';
                }
            }
        }
        return best;
    }

    // If this minimizer's move
    else {
        let best = 1000;

        // Traverse all cells
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                // Check if cell is empty
                if (board[row][col] === '_') {
                    // Make the move
                    board[row][col] = realPlayer;

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best, minimax(board, depth + 1, isMax));

                    // Undo the move
                    board[row][col] = '_';
                }
            }
        }
        return best;
    }
}

// This will return the best possible
// move for the player
function findBestMove(board) {
    let bestVal = -1000,
        bestMove = {
            row: -1,
            col: -1
        };

    // Traverse all cells, evaluate minimax function 
    // for all empty cells. And return the cell 
    // with optimal value.
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            // Check if cell is empty
            if (board[row][col] === '_') {
                // Make the move
                board[row][col] = realPlayer;

                // compute evaluation function for this
                // move.
                let moveVal = minimax(board, 0, true);

                // Undo the move
                board[row][col] = '_';

                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal) {
                    bestMove.row = row;
                    bestMove.col = col;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}
