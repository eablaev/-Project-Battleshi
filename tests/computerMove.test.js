
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
    it('Returns array of hit ships', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};
        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[0][1].shipId = 1;
        humanBoard.grid[0][2].hit = true;
        humanBoard.grid[0][2].shipId = 1;
    
        expect(findHitShips(humanBoard)).toEqual([[0, 1],[0, 2]]);
    });
});

describe('targetShips', () => {
    it('returns new coordinates of neighboring sells. top cell', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};
        humanBoard.grid[1][1].hit = true;
        humanBoard.grid[1][1].shipId = 1;

        expect(targetShip([1, 1], humanBoard)).toEqual([0, 1]);  
    });
    it('returns new coordinates of neighboring sells. bottom cell', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};
        humanBoard.grid[1][1].hit = true;
        humanBoard.grid[1][1].shipId = 1;
        humanBoard.grid[0][1].hit = true;

        expect(targetShip([1, 1], humanBoard)).toEqual([2, 1]);  
    });
    it('returns new coordinates of neighboring sells. bottom left', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};
        humanBoard.grid[1][1].hit = true;
        humanBoard.grid[1][1].shipId = 1;
        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[2][1].hit = true;


        expect(targetShip([1, 1], humanBoard)).toEqual([1, 0]);  
    });
    it('returns new coordinates of neighboring sells. bottom right', () => {
        const humanBoard = {
        grid: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => ({hit: false, shipId: null}))
        )};
        humanBoard.grid[1][1].hit = true;
        humanBoard.grid[1][1].shipId = 1;
        humanBoard.grid[0][1].hit = true;
        humanBoard.grid[2][1].hit = true;
        humanBoard.grid[1][0].hit = true;


        expect(targetShip([1, 1], humanBoard)).toEqual([1, 2]);  
    });

});

