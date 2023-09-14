import { renderShip } from "./ui.js";

export function placeComputerShips(computerBoard) {
    
    let computerShipId = 1;
    let computerShipLength = 4;
    let shipCount = 1;
  
    while (computerShipId <= 6) {
      const axis = Math.floor(Math.random() * 2);
      const direction = axis === 1 ? 'horizontal' : 'vertical';
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
  
      const result = computerBoard.placeShip(row, col, computerShipLength, direction);
  
      if (result) {
        renderShip('computerBoard', row, col, computerShipLength, direction, computerShipId);
        computerShipId++;
        if (computerShipId === 7) {
          console.log('ComputerShips placed');
        }
        if (shipCount === 0) {
          computerShipLength--;
          shipCount = 2;
        }
        shipCount--;
      }
    }
  }
  