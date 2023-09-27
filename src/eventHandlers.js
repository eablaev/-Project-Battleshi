import {getAxisValue, renderSunkShip} from "./ui.js";

export  function handleAttackResult(attackResult, board, row, col, gameOver) {
    if(attackResult) {    
        const shipId = board.grid[row][col].shipId;
        const hitShip = board.ships.find(ship => ship.shipId === shipId);
        if(hitShip.isSunk()) {
            console.log(board.ships)
            renderSunkShip(shipId);
            if(board.allShipsSunk()) {
                gameOver()
                return true
            }
        }
    }
    return
};
  
export function handleAxisSwitch(el) {
    el.innerHTML = el.innerHTML === 'X Axis' ? 'Y Axis' : "X Axis";
};

export function handleMouseOver(row, col, length, grid) {
    // console.log('mouseover');
    const axis = getAxisValue();
    const direction = axis === 'X' ? 'horizontal' : 'vertical';
    //checks
    for(let i = 0; i < length; i++) {
        if(direction === 'horizontal') {
            if(col + i < 0 || col + i >= 10 )  {   
                return false;
            }
           
            if(grid[row][col + i].shipId) {
                return false
            } 
        } else if(direction === 'vertical') {
         
            if(row + i < 0 || row + i >= 10 )  {
               
                return false
            };

                if(grid[row + i][col].shipId) {
                    return false
                } 
        }
    }
    //
    for (let i = 0; i < length; i++) {
        let cell = null;
        if (direction === 'horizontal') {
            const newCol = col + i;
            cell = document.querySelector('#boardOne').querySelector(`[data-row="${row}"][data-col="${newCol}"]`);    
        } else if(direction === 'vertical') {
            const newRow = row + i;
            cell = document.querySelector('#boardOne').querySelector(`[data-row="${newRow}"][data-col="${col}"]`);
        }
        if (cell) {        
            cell.classList.add('highlight');
        }
    }
}

export function handleMouseOut(row, col, length) {
    // console.log('mouseout')
    const axis = getAxisValue();
    const direction = axis === 'X' ? 'horizontal' : 'vertical';

    for (let i = 0; i < length; i++) {
        let cell = null;
        if (direction === 'horizontal') {
            const newCol = col + i; 
            cell = document.querySelector('#boardOne').querySelector(`[data-row="${row}"][data-col="${newCol}"]`);
        } else if (direction === 'vertical') {
            const newRow = row + i;
            cell = document.querySelector('#boardOne').querySelector(`[data-row="${newRow}"][data-col="${col}"]`);
        }
        if (cell) {          
            cell.classList.remove('highlight');
        }
    }
}

