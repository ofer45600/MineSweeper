console.log('Hi');
const MINE = '💣';
const FLAG = '🚩';


var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

function init() {
    gBoard = buildBoard();
    setMinesNegsCount()
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }

        }
    }
    board[0][3].isShown = board[3][0].isShown = true;
    if (board[0][3].isShown && board[3][0].isShown) {
        board[0][3].isMine = true;
        board[3][0].isMine = true;
    }
    return board;
}


function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = board[i][j];
            var className = 'game-cell';
            var tdId = 'cell-' + i + '-' + j;
            if (cell.isShown) {

                if (cell.isMine) {
                    strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                        'class=" ' + className + '">' + MINE + '</td>';
                }
            } else {
                strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                    'class=" ' + className + '">' + '' + '</td>';
            }
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

function getNegsCount(cellI, cellJ) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine) {
                negsCount++;
            }

        }
    }
    return negsCount;
}


function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = getNegsCount(i, j);

        }
    }
}

function cellClicked(elTd) {
    var elTd = document.querySelector(`#cell-${elTd.i}-${elTd.j}`);
    console.log(elTd);

}