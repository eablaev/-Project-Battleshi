import { getAxisValue, renderShip, renderSunkShip, renderWinningMessage, handleGameReset} from "./ui.js";


let humanShipId = 1;
let humanShipLength = 4;
let shipCount = 1;


export  function handleAttackResult(attackResult, board, row, col) {
    if(attackResult) {    
        const shipId = board.grid[row][col].shipId;
        const hitShip = board.ships.find(ship => ship.shipId === shipId);
        if(hitShip.isSunk()) {
            console.log(board.ships)
            renderSunkShip(shipId);
            if(board.allShipsSunk()) {
                handleGameReset();
                renderWinningMessage();
                return true
            }
        }
    }
    return
}
  

export function handleHumanShipPlacement(row, col, humanBoard) {
    const axis = getAxisValue();
    const direction = axis === 'X' ? 'horizontal' : 'vertical'
    console.log(direction);
    
    const result = humanBoard.placeShip(row, col, humanShipLength, direction);
    console.log(result)
     if (result) {
            renderShip('humanBoard', row, col, humanShipLength, direction, humanShipId);
            humanShipId ++; 
            if(humanShipId === 7) {
                console.log('Please make a move');
    
                return true;
           }
             if(shipCount === 0) {
             humanShipLength --;
             shipCount = 2
            }
          shipCount --; 
     };    
 }; 