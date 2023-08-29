
const createShip = require('./createShip');

function createGameboard() {
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

module.exports = createGameboard;