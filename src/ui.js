const computerBoard = document.getElementById('boardTwo');
const humanBoard = document.getElementById('boardOne');

export function initUi() {

}

export function renderGameboard(grid,containerId) {
 
    const boardContainer = document.getElementById(containerId);


    grid.forEach((row,indexRow) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row')
        row.forEach((cell,indexCell) => {
            
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-row', indexRow);
            cellElement.setAttribute('data-col', indexCell);

            if(cell.shipId) {
               
                cellElement.classList.add(`ship-${cell.shipId}`)
                cellElement.setAttribute('data-ship', cell.shipId);
            }
            
            rowElement.appendChild(cellElement)
        });
        boardContainer.appendChild(rowElement)
    })
};

export function renderShip(board, row, col, length, direction, shipId) {
    const currentBoard = board === 'humanBoard' ? humanBoard : computerBoard;
    // console.log(currentBoard);
    // console.log(row, col);
    // console.log(typeof(col))

    
    
    for (let i = 0; i < length; i ++) {
        if(direction === 'horizontal') {
            const newRow = parseInt(row, 10);
            const newCol = parseInt(col, 10) + i;
            const cell = humanBoard.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            cell.classList.add(`ship-${shipId}`);
        } else if (direction === 'vertical') {
            const newRow = parseInt(row, 10) + i;
            const newCol = parseInt(col, 10);
            const cell = humanBoard.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            cell.classList.add(`ship-${shipId}`);
        }
        
        // console.log(cell)
        // cell.classList.add('ship-1');
        
    }   
}


export function cellsEventListeners(board,callback) {
    console.log('ya')
    const selector = board === 'humanBoard' ?'boardOne' : 'boardTwo';
    console.log(selector)
    const currentBoard = document.getElementById(selector)
    
    currentBoard.addEventListener('click', (e) => {
        const row = parseInt(e.target.getAttribute('data-row'), 10);
        const col = parseInt(e.target.getAttribute('data-col'), 10);
 
        callback(row, col);   
    });
}
export function renderHitCell(board, row, col) {
    const currentBoard = board === 'humanBoard' ? humanBoard : computerBoard;
    console.log(currentBoard)
    const hitCell = currentBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    hitCell.classList.add('hit');
}

export function renderSunkShip(shipId) {
    const cells = computerBoard.querySelectorAll('.cell');
    cells.forEach(cell => {
        
        if(cell.getAttribute('data-ship')) {
            const dataShipValue = cell.getAttribute('data-ship');
            if(dataShipValue == shipId) {
                cell.classList.add('sunk'); 
            }
        } 
    });
}

export function renderWinningMessage() {
    console.log('You won')
}

export function buttonEventListener(id) {
    const buttonElement = document.getElementById(id);
    buttonElement.addEventListener('click',() => {
       
        buttonElement.innerHTML = buttonElement.innerHTML === 'X Axis' ? 'Y Axis' : "X Axis"
    })
}

export function getAxisValue() {
    const axisButtonElement = document.getElementById('axisButton');
    return axisButtonElement.innerHTML === 'X Axis' ? 'X' : 'Y'
}