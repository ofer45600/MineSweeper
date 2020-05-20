console.log('Hi');
const MINE = '💣';
const FLAG = '🚩';


var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
gBoard = buildBoard();
console.table(gBoard);

function init() {

    renderBoard(gboard);
    setMinesNegsCount()
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true, value: '' }

        }
    }
        board[0][3].isShown = board[3][0].isShown = true;
    if (board[0][3].isShown && board[3][0].isShown) {
        board[0][3].value = board[3][0].value = MINE;
    }
    return board;
}

renderBoard(gBoard)
console.log(gBoard);

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = board[i][j].value
            var className = 'game-cell';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class=" ' + className + '">' + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j >= mat[i].length;) {
            if (j < 0 || j > mat[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].value === MINE) {
                negsCount++;
                mat[i][j].minesAroundCount++;

            }

        }
        return negsCount;
    }
}