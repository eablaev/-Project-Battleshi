const createGameboard = require('../src/createGameboard');
const createShip = require('../src/createShip')

it('Gameboards creates grid with 10 rows', () => {
    expect(createGameboard().grid.length).toBe(10);
});

it('Gameboard has 10 columns in each row', () => {
    const newBoard = createGameboard().grid;
    newBoard.forEach(row => {
        expect(row.length).toBe(10)
    });
});

it('Gameboard places ships at specific coordinates horizontally ', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'horizontal');
    
    for(let col = 0; col < 4; col ++) {
        expect(newBoard.grid[0][col].shipId).toBe(1)
    }  
});

it('Gameboard places ships at specific coordinates vertically ', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'vertical');
    
    for(let row = 0; row < 4; row ++) {
        expect(newBoard.grid[row][0].shipId).toBe(1)
    }  
});

it('receiveAttack  determines whether or not the attack hit a ship', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'vertical');
    
    expect(newBoard.receiveAttack(3,0)).toBe(true);
});

it('receiveAttack  sends the hit function to the correct ship', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'horizontal');
    newBoard.receiveAttack(0, 0);

    const attackedShip = newBoard.ships.find(ship => ship.shipId === 1);

    expect(attackedShip.hits).toBe(1);
});

it('receiveAttack  marks attacked cell with hit ==== true if it belongs to a ship', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'horizontal');
    newBoard.receiveAttack(0, 0);

    const attackedCell = newBoard.grid[0][0]

    expect(attackedCell.hit).toBe(true);
});
it('receiveAttack  marks attacked cell with hit ==== true if it misses', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'horizontal');
    newBoard.receiveAttack(1, 0);

    const attackedCell = newBoard.grid[1][0]

    expect(attackedCell.hit).toBe(true);
});

it('Gameboards reports if the ship has sunk', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,1,'horizontal');
    newBoard.receiveAttack(0, 0);

    const attackedShip = newBoard.ships.find(ship => ship.shipId === 1);
    expect(attackedShip.isSunk()).toBe(true);
});

it('Gameboards reports if the ship has sunk. Multi-cell ships', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'horizontal');

    for (let col = 0; col < 4; col++) {
        newBoard.receiveAttack(0, col);
    }


    const attackedShip = newBoard.ships.find(ship => ship.shipId === 1);
    expect(attackedShip.isSunk()).toBe(true);
});

it('Gameboards reports if all the ships have been sunk', () => {
    const newBoard = createGameboard();
    newBoard.placeShip(0,0,4,'horizontal');
    newBoard.ships[0].isSunk = jest.fn().mockReturnValue(true);

    expect(newBoard.allShipsSunk()).toBe(true);
    
});

