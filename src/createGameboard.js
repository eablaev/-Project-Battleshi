
import {createShip} from './createShip.js'

export function createGameboard() {
    const grid = [];
    const ships = [];
    let shipId = 1;

    for(let row = 0; row < 10; row++) {
        const rowArray = [];
        for(let col = 0; col < 10; col ++) {
            rowArray.push({
                shipId: null,
                hit: false
            });
        }
        grid.push(rowArray);
    }

    return {
        grid: grid,
        ships:ships,
        placeShip(row, col, length, direction) {
            //placement checks:
            //1.range
           
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
            const newShip = createShip(length);
            newShip.shipId = shipId;
            ships.push(newShip);
     
            for(let i = 0; i < length; i++) {
                if(direction === 'horizontal') {
                    grid[row][col + i].shipId = shipId;
                } else {
                    grid[row + i][col].shipId = shipId;
                }
            }
            shipId ++;
            return true;
            
        },
        receiveAttack(row, col) {
            const attackedCell = this.grid[row][col];
            if(attackedCell.shipId) {
                const shipId = attackedCell.shipId;
                this.ships.find(ship => ship.shipId === shipId).hit();
                attackedCell.hit = true;
                return true
            } else {
                attackedCell.hit = true;
                return false
            }
        },
        allShipsSunk() {
            if(this.ships.every(ship => ship.isSunk() === true)) {
                return true
            } else {
                return false
            }
        }
   }
}

