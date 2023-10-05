
import {randomCoordinates, computerMove, findHitShips, targetShip } from "../src/computerMove.js";


describe('randomCoordinates', () => {
    it('should generate random coordinates within the grid', () => {
        const humanBoard = {
            grid: Array.from({ length: 10 }, () =>
              Array.from({ length: 10 }, () => ({ hit: false }))
            ),
          };
        const [row, col] = randomCoordinates(humanBoard);

        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(10);
        expect(col).toBeGreaterThanOrEqual(0);
        expect(col).toBeLessThan(10);
    });

    it('should avoid coordinates that have already been marked as hit', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () =>
          Array.from({ length: 10 }, () => ({ hit: true }))
        )};
        humanBoard.grid[0][1].hit = false;
         
        const [row, col] = randomCoordinates(humanBoard);
          
        expect(row).toBe(0);
        expect(col).toBe(1);
    })
});

describe('findHitShips', () => {
    it('Returns coordinates of a first hit ship', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};
        humanBoard.ships = [{length : 2, hits: 2, shipId: 1, isSunk: () => false}]
        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][2].hit = true;

        humanBoard.grid[0][1].shipId = 1;
        humanBoard.grid[0][2].shipId = 1;
        
        expect(findHitShips(humanBoard)).toEqual([0, 1]);
    });
    it('Ignores sunk ships coordinates of a first hit ship', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};

        humanBoard.ships = [{length : 2, hits: 2, shipId: 1, isSunk: () => true}]
        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][2].hit = true;

        humanBoard.grid[0][1].shipId = 1;
        humanBoard.grid[0][2].shipId = 1;
        
        expect(findHitShips(humanBoard)).toEqual(null);
    });
});



describe('targetShips', () => {
    it('targets a horizontal ship with 2 consecutive hits. Goes right', () => {
        const humanBoard = {
            grid: Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};

        humanBoard.grid[0][0].shipId = 1;
        humanBoard.grid[0][1].shipId = 1;
        humanBoard.grid[0][2].shipId = 1;

        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][2].hit = true;
        
        expect(targetShip([0, 1], humanBoard)).toEqual([0, 3]); 
    }); 

    it('targets a horizontal ship with 2 consecutive hits.Reverse and goes left', () => {
        const humanBoard = {
            grid: Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};

        humanBoard.grid[0][0].shipId = 1;
        humanBoard.grid[0][1].shipId = 1;
        humanBoard.grid[0][2].shipId = 1;

        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][2].hit = true;
        humanBoard.grid[0][3].hit = true;
        
        expect(targetShip([0, 1], humanBoard)).toEqual([0, 0]); 
    }); 
 
    it('targets a horizontal ship with 3 consecutive hits.Reverse and goes left', () => {
        const humanBoard = {
            grid: Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};

        humanBoard.grid[0][0].shipId = 1;
        humanBoard.grid[0][1].shipId = 1;
        humanBoard.grid[0][2].shipId = 1;
        humanBoard.grid[0][3].shipId = 1;

        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][2].hit = true;
        humanBoard.grid[0][3].hit = true;
        humanBoard.grid[0][4].hit = true;
        
        expect(targetShip([0, 2], humanBoard)).toEqual([0, 0]); 
    }); 

    

    it('targets a horizontal ship with 2 hit hits', () => {
        const humanBoard = {
            grid: Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};

       
        
        humanBoard.grid[0][2].shipId = 1;
        humanBoard.grid[0][3].shipId = 1;

        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][2].hit = true;
        humanBoard.grid[0][3].hit = true;
        
        
        expect(targetShip([0, 3], humanBoard)).toEqual([0, 4]); 
    }); 

 
    // it('targets a vertical ship with 2 consecutive hits', () => {
    //     const humanBoard = {
    //         grid: Array.from({ length: 10 }, () => 
    //             Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
    //     )};

    //     humanBoard.grid[2][3].shipId = 1;
    //     humanBoard.grid[3][3].shipId = 1;

    //     humanBoard.grid[2][3].hit = true;
    //     humanBoard.grid[3][3].hit = true;
        
        
  
    //     expect(targetShip([3, 3], humanBoard)).toEqual([4, 3]); 
    // }); 
     
   
})