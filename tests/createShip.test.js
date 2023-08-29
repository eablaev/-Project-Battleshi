const createShip = require('../src/createShip');


it('Ship return correct length', () => {
    const ship = createShip(4)
    expect(ship.length).toBe(4)
});

it('hit() function that increases the number of hits', () => {
    const ship = createShip(4)
    ship.hit();
    expect(ship.hits).toBe(1)
});

it('isSunk()  returns true when  length and the number of hits are equal', () => {
    const ship = createShip(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true)
}); 

it('isSunk()  returns false when  length and the number of hits are not equal', () => {
    const ship = createShip(1);
  
    expect(ship.isSunk()).toBe(false)
}); 



