import { cellsEventListeners, getAxisValue, renderShip, cellsEventListenersMouseOut, cellsEventListenersMouseOver} from "./ui.js";
import { handleMouseOver, handleMouseOut } from "./eventHandlers.js";


export function placeHumanShips(humanBoard, callback) {
    let shipLength = 4;
    let numberOfShips = 2;
    let shipId = 1;
    
    cellsEventListenersMouseOver('humanBoard', (row, col) => {
       if(shipLength > 1) {
           handleMouseOver(row, col, shipLength, humanBoard.grid)
       };
       
    });

    cellsEventListenersMouseOut('humanBoard', (row, col) => {
        if(shipLength >= 1) {
            handleMouseOut(row, col, shipLength+1)
        }
       
    });

   

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


