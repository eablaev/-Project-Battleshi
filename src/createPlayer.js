function createPlayer () {
    const attackedCells = new Set();

    return {
        attack(gameBoard, row, col) {
            const cellCoordinates = `${row} - ${col}`;
            if(attackedCells.has(cellCoordinates)) {
                return false;
            } 
            attackedCells.add(cellCoordinates);
            gameBoard.receiveAttack(row, col);

            return true;
        }
    }
}

module.exports = createPlayer;