import { cellsEventListeners, getAxisValue, renderShip } from "./ui.js";




export function placeHumanShips(humanBoard) {
    let shipLength = 4;
    let numberOfShips = 2;
    let shipId = 1;
    let allShipsPlaced = false;
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
                        console.log('All human ships were placed');
                        return true
                    }
                                  
                    numberOfShips = 2; 
                }
                shipId++;
                return false   
            }; 
        } 
        
    }); 
    
}


