'use strict'

const PACMAN = '😀'
var gPacman
var gDeadGhosts = []

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCount--
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        activateSuperMode()
    }

    if (typeof nextCell === 'object' && gGhosts.includes(nextCell)) {
        if (gPacman.isSuper) {
            gDeadGhosts.push(nextCell)
            gGhosts = gGhosts.filter(ghost => ghost !== nextCell)
            renderCell(nextCell.location, EMPTY)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    renderCell(gPacman.location, PACMAN)
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default:
            return null
    }

    return nextLocation
}

function activateSuperMode() {
    gPacman.isSuper = true

    gGhosts.forEach(ghost => {
        ghost.imgSrc = SUPER_GHOST_IMG
        renderCell(ghost.location, getGhostHTML(ghost))
    })

    setTimeout(deactivateSuperMode, 5000)
}

function deactivateSuperMode() {
    gPacman.isSuper = false

    gGhosts.forEach((ghost, idx) => {
        ghost.imgSrc = GHOST_IMAGES[idx]
        renderCell(ghost.location, getGhostHTML(ghost))
    })

    while (gDeadGhosts.length > 0) {
        var ghost = gDeadGhosts.pop()
        ghost.imgSrc = GHOST_IMAGES[gGhosts.length]
        gGhosts.push(ghost)
        gBoard[ghost.location.i][ghost.location.j] = ghost
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}



