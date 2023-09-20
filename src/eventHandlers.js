import { buttonEventListener, getAxisValue, renderShip, renderSunkShip, renderWinningMessage} from "./ui.js";



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

export function handleMouseOver(row, col, length) {
    console.log('mouseover')

    console.log(row, col);
    console.log(length)
    const axis = getAxisValue();
    const direction = axis === 'X' ? 'horizontal' : 'vertical';

    for (let i = 0; i < length; i++) {
        if (direction === 'horizontal') {
            const newCol = col + i;
            
            const cell = document.querySelector('#boardOne').querySelector(`[data-row="${row}"][data-col="${newCol}"]`);
            console.log(cell)
            if (cell) {
                console.log(cell)
                cell.classList.add('highlight');
            }
        }
    }
}
export function handleMouseOut(row, col, length) {
    console.log('mouseout')

    console.log(row, col);
    console.log(length)
    const axis = getAxisValue();
    const direction = axis === 'X' ? 'horizontal' : 'vertical';

    for (let i = 0; i < length; i++) {
        if (direction === 'horizontal') {
            const newCol = col + i;
            
            const cell = document.querySelector('#boardOne').querySelector(`[data-row="${row}"][data-col="${newCol}"]`);
            console.log(cell)
            if (cell) {
                console.log(cell)
                cell.classList.remove('highlight');
            }
        }
    }
}






//trsh 

// let humanShipId = 1;
// let humanShipLength = 4;
// let shipCount = 1;


// export function handleHumanShipPlacement(row, col, humanBoard) {
//     const axis = getAxisValue();
//     const direction = axis === 'X' ? 'horizontal' : 'vertical'
//     console.log(direction);
    
//     const result = humanBoard.placeShip(row, col, humanShipLength, direction);
//     console.log(result)
//      if (result) {
//             renderShip('humanBoard', row, col, humanShipLength, direction, humanShipId);
//             humanShipId ++; 
//             if(humanShipId === 7) {
//                 console.log('Please make a move');
    
//                 return true;
//            }
//              if(shipCount === 0) {
//              humanShipLength --;
//              shipCount = 2
//             }
//           shipCount --; 
//      };    
//  }; 


