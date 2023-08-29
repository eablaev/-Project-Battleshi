const createPlayer = require('../src/createPlayer');
const createGameboard = require('../src/createGameboard');

it('createPlayer should be able to attack a ship', () => {
    const newPlayer = createPlayer();
    const newBoard = createGameboard();
    newBoard.placeShip(0, 0, 4)

    expect(newPlayer.attack(newBoard, 0, 0)).toBe(true)

});

it('createPlayer should be able to reject attack with repeating coordinates', () => {
    const newPlayer = createPlayer();
    const newBoard = createGameboard();
    newBoard.placeShip(0, 0, 4);
    newPlayer.attack(newBoard, 0, 0)

    expect(newPlayer.attack(newBoard, 0, 0)).toBe(false)
});