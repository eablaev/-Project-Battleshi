import { cellsEventListeners, getAxisValue, renderShip, highlightShips, removeHighlightShips } from "./ui.js";

// function highlightShips(humanBoard ,row, col, length, direction) {
  

//     for (let i = 0; i < length; i ++) {
//         if(direction === 'horizontal') {
//             const newRow = parseInt(row, 10);
//             const newCol = parseInt(col, 10) + i;
//             const cell = humanBoard.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
//             cell.classList.add('highlight');
//         } else if (direction === 'vertical') {
//             const newRow = parseInt(row, 10) + i;
//             const newCol = parseInt(col, 10);
//             const cell = humanBoard.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
//             cell.classList.add('highlight');
//         }  
//     } 
// }
// function removeHighlight(humanBoard) {
//     const cells = humanBoard.querySelectorAll('.highlight');
//     cells.forEach(cell => {
//         cell.classList.remove('highlight');
//     });
// }

export function placeHumanShips(humanBoard, callback) {
    let shipLength = 4;
    let numberOfShips = 2;
    let shipId = 1;
    
    //
    highlightShips();
    removeHighlightShips();
    
    //
    cellsEventListeners('humanBoard', (row, col) => {
      
    
        if(shipLength > 1) {
            const axis = getAxisValue();
            const direction = axis === 'X' ? 'horizontal' : 'vertical'
            
            const result = humanBoard.placeShip(row, col, shipLength, direction);

            if (result) {
                renderShip('humanBoard', row, col, shipLength, direction, shipId)
                numberOfShips --;
                if(numberOfShips === 0) {
                    shipLength --;
                    if (shipLength === 1) {
                        callback() 
                    }                  
                    numberOfShips = 2; 
                }
                shipId++; 
            }; 
        }       
    });   
}


