const computerBoard = document.getElementById('boardTwo');
const humanBoard = document.getElementById('boardOne');

//event listeners
export function cellsEventListeners(board, callback) {
   
    const selector = board === 'humanBoard' ?'boardOne' : 'boardTwo';
  
    const currentBoard = document.getElementById(selector);
    const cells = currentBoard.querySelectorAll('#cell');
    
    cells.forEach(cell => {
       
        cell.addEventListener('click', (e) => {
            console.log(e.target)
     
            const row = parseInt(e.target.getAttribute('data-row'), 10);
            const col = parseInt(e.target.getAttribute('data-col'), 10);
     
            callback(row, col);   
        })
    })
   
}

export function cellsEventListenersMouseOver(board, callback) {
    const selector = board === 'humanBoard' ?'boardOne' : 'boardTwo';
  
    const currentBoard = document.getElementById(selector);
    const cells = currentBoard.querySelectorAll('#cell');
    
    cells.forEach(cell => {
       
        cell.addEventListener('mouseover', (e) => {
           
            const row = parseInt(e.target.getAttribute('data-row'), 10);
            const col = parseInt(e.target.getAttribute('data-col'), 10);
     
            callback(row, col);   
        })
    })

}

export function cellsEventListenersMouseOut(board, callback) {
    const selector = board === 'humanBoard' ?'boardOne' : 'boardTwo';
  
    const currentBoard = document.getElementById(selector);
    const cells = currentBoard.querySelectorAll('#cell');
    
    cells.forEach(cell => {
       
        cell.addEventListener('mouseout', (e) => {
       
            const row = parseInt(e.target.getAttribute('data-row'), 10);
            const col = parseInt(e.target.getAttribute('data-col'), 10);
     
            callback(row, col);   
        })
    })

}

export function buttonEventListener(id, callback) {
    const buttonElement = document.getElementById(id);
    buttonElement.addEventListener('click',() => {
       
       callback(buttonElement)
    })
}

////renders
export function renderGameboard(grid,containerId) {
    const boardContainer = document.getElementById(containerId);
    while (boardContainer.firstChild) {
        boardContainer.removeChild(boardContainer.firstChild);
    }
 
    grid.forEach((row,indexRow) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row')
        row.forEach((cell,indexCell) => {
            
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.id = 'cell'
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
    const selector = board === 'humanBoard' ? 'boardOne' : 'boardTwo';
    const currentBoard = document.getElementById(selector);

    for (let i = 0; i < length; i ++) {
        if(direction === 'horizontal') {
            const newRow = parseInt(row, 10);
            const newCol = parseInt(col, 10) + i;
            const cell = currentBoard.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            cell.classList.add(`ship-${shipId}`);
            if(selector === 'boardTwo') {
                cell.classList.add('hide')
            }
            cell.setAttribute('data-ship', shipId)
        } else if (direction === 'vertical') {
            const newRow = parseInt(row, 10) + i;
            const newCol = parseInt(col, 10);
            const cell = currentBoard.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            
            if(selector === 'boardTwo') {
                cell.classList.add('hide')
            }
            cell.classList.add(`ship-${shipId}`);
            cell.setAttribute('data-ship', shipId)
        }  
    }   
}

export function renderHitCell(board, row, col) {
    const currentBoard = board === 'humanBoard' ? humanBoard : computerBoard;
    console.log(currentBoard)
    const hitCell = currentBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if(hitCell.classList.contains('hide')) {
        console.log('yooooooooooo')
        hitCell.classList.remove('hide')
    }
    hitCell.classList.add('hit');
}

export function renderSunkShip(shipId) {
    console.log('render sunk ship')
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

export function renderGameMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = ''
    const messageSplit = message.split('');

    console.log(messageElement.innerHtml);

    for(let i = 0; i < messageSplit.length; i++) {
        messageElement.innerHTML += "<span>"+ messageSplit[i]+ "</span>"
    };
    let charIndex = 0;
    let timer = setInterval(onTick, 50);
    function onTick() {
        const span = document.querySelectorAll('span')[charIndex];
        span.classList.add('fade')
        charIndex++;
        if(charIndex === messageSplit.length) {
            endTimer();
            console.log(document.querySelectorAll('span')[0])
            return
        }
    }
    function endTimer() {
        clearInterval(timer);
        timer = null;
    }
  
  }

export function renderWinningMessage() {
    console.log('You won')
}

export function renderResetWindow () {
    const resetGameElement = document.getElementById('resetGame');
    resetGameElement.classList.add('show');
}

//gets
export function getAxisValue() {
    const axisButtonElement = document.getElementById('axisButton');
    return axisButtonElement.innerHTML === 'X Axis' ? 'X' : 'Y'
}