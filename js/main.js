var gSIZE = (4 ** 2)
var gCurrNum
var gBoard
var gTimerIntervalId
var gTimeLapse


function onInit() {
    resetTimer()
    gCurrNum = 1
    gBoard = createBoard()
    renderBoard()
    renderCurrNum()
}


function onCellClicked(elCell) {
    const elCellNum = +elCell.innerText

    if (gCurrNum >= gSIZE) checkForWin()
    if (elCellNum !== gCurrNum) return

    startTimer()
    gCurrNum++
    renderCurrNum()
    OnRenderActiveCell(elCell)
}

function OnRenderActiveCell(elCell) {
    elCell.classList.add('active')
}

function checkForWin() {
    if (gCurrNum >= gSIZE) {
        resetTimer()
    }
}

function renderCurrNum() {
    if (gCurrNum > gSIZE) {
        renderResetBtn()
        return
    }

    var strHTML = ''
    strHTML += '<h3>Current number:</h3>'
    strHTML += `<p class="curr-num">${gCurrNum}</p>`
    const elCurrNumCont = document.querySelector('.curr-num-container')
    elCurrNumCont.innerHTML = strHTML

    // const elCurrNum = document.querySelector('.curr-num')
}

function renderResetBtn() {
    var strHTML = ''
    strHTML += '<p class="curr-num">Time! 🎬</p>'
    strHTML += '<button class="reset" onclick="onInit()">Reset</button>'

    const elCurrNumContainer = document.querySelector('.curr-num-container')
    elCurrNumContainer.innerHTML = strHTML

}

function renderTimer() {
    var strHTML = `${gTimeLapse}`
    const elTimer = document.querySelector('p.timer')
    elTimer.innerText = strHTML
}

function resetTimer() {
    clearInterval(gTimerIntervalId)
}

function startTimer() {
    if (gCurrNum !== 1) return

    var start = Date.now();
    gTimerIntervalId = setInterval(() => {
        var delta = Date.now() - start;
        gTimeLapse = (delta / 1000);
        renderTimer()
    }, 1);
}

function onChangeBoardSize(elRadioBtn) {
    gSIZE = elRadioBtn.id ** 2
    onInit()
}

function renderBoard() {
    //DOM
    var clonedBoard = gBoard.slice()
    const clonedBoardSqrt = Math.sqrt(clonedBoard.length)
    var strHTML = ''

    for (var i = 0; i < clonedBoardSqrt; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < clonedBoardSqrt; j++) {
            strHTML += `<td onclick="onCellClicked(this)"> ${clonedBoard.pop()} </td>`
        }
        strHTML += '</tr>'

    }
    const elTBody = document.querySelector('tbody')
    elTBody.innerHTML = strHTML
}

function createBoard() {
    var board = []
    for (var i = 0; i < gSIZE; i++) {
        board.push(i + 1)
    }
    shuffleBoard(board)
    return board
}

