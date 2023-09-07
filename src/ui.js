const computerBoard = document.getElementById('boardTwo');

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

export function cellsEventListeners(board,callback) {
    const selector = board === 'humanBoard' ?'boardOne' : 'boardTwo';
    const currentBoard = document.getElementById(selector)
    
    currentBoard.addEventListener('click', (e) => {
        const row = e.target.getAttribute('data-row');
        const col = e.target.getAttribute('data-col');
        e.target.classList.add('hit')
        callback(row, col);
        
    });

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