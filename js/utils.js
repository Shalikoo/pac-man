'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getEmptyCell() {
    const emptyCells = [];

    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (
                gBoard[i][j] !== WALL &&
                gBoard[i][j] !== SUPER_FOOD &&
                gBoard[i][j] !== EMPTY &&
                gBoard[i][j] !== CHERRY &&
                typeof gBoard[i][j] !== 'object'
            ) {
                emptyCells.push({ i, j });
            }
        }
    }

    if (!emptyCells.length) return null;

    const randIdx = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randIdx];
}