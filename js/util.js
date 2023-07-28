'use strict'

function shuffleBoard(board) {
    for (var i = board.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = board[i];
        board[i] = board[j];
        board[j] = temp;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}