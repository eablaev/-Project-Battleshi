import { renderHitCell } from "./ui.js";
import { handleAttackResult } from "./eventHandlers.js";

export function randomCoordinates(board) {
    let col, row;
    do {
        col = Math.floor(Math.random() * 10); 
        row = Math.floor(Math.random() * 10);
    } while (board.grid[row][col].hit === true);

    return [row, col]
}
export function findHitShips(board) {
    for (let rowIndex = 0; rowIndex < board.grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board.grid[rowIndex].length; colIndex++) {
            const cell = board.grid[rowIndex][colIndex];
            const ship  = board.ships.find(ship => ship.shipId === cell.shipId)
            if (cell.shipId && cell.hit && ship.isSunk() === false) {
                console.log('inside findHitShip')
                    return [rowIndex, colIndex]; // Return the first hit ship coordinates
            }
        }
    }
    return null; // Return null if no hit ships are found
}

// Helper function for horizontal movements
function findHorizontalTarget(coordinates, board) {
    let [row, col] = coordinates;
    let newCol = col;
    let searchingRight = true;
    let consecutiveHits = false;

    while(newCol >= 0 && newCol < 10) { //checks the range
        if( //checks if the cell is hit and part of the ship
            board.grid[row][newCol].hit === true && 
            board.grid[row][newCol].shipId
        ) { 
            if(searchingRight) { // checks if we reached end of consecutive hits and try next cell 
                if(board.grid[row][newCol +1] && board.grid[row][newCol +1].hit === false) {
                    if(consecutiveHits === true) {
                        return [row, newCol +1]
                    } 
                   
                }
            } else {
                if(board.grid[row][newCol -1] && board.grid[row][newCol -1].hit === false) {
                    if(consecutiveHits === true) {
                        return [row, newCol -1]
                    } 
                    
                }
            }
            
        } else {//if we reached end of consecutive hits and tried next cell - reverse direction
            searchingRight = !searchingRight;
            consecutiveHits = false; 
        }

        if(searchingRight) {
            newCol ++;
            consecutiveHits = true;
        } else {
            newCol --;
            consecutiveHits = true;
        }
    }

    return null;
}

function findVerticalTarget(coordinates, board) {
    let [row, col] = coordinates;
    let newRow = row;
    let searchingDown = true;
    let consecutiveHits = false;

    while(newRow >= 0 && newRow < 10) {
        if(
            board.grid[newRow][col].hit === true && 
            board.grid[newRow][col].shipId) {
                if(searchingDown) {
                    if(
                        board.grid[newRow +1][col] 
                        && board.grid[newRow +1][col].hit === false) {
                            if(consecutiveHits === true) {
                                return [newRow +1, col]
                            } 
                        
                    }
                } else {
                    if(board.grid[newRow -1][col] && board.grid[newRow -1][col].hit === false) {
                        if(consecutiveHits === true) {
                            return [newRow -1, col]
                        } 
                        
                    } 
                }
        } else {
            searchingDown = !searchingDown;
        }
        if(searchingDown) {
            newRow ++;
            consecutiveHits = true;
        } else {
            newRow --
            consecutiveHits = true;
        }
    }
    return null
}

export function  targetShip(coordinates, board) {
    const horizontalTarget = findHorizontalTarget(coordinates, board);
    if (horizontalTarget) {
        return horizontalTarget;
    } 

    const verticalTarget = findVerticalTarget(coordinates, board);
    if (verticalTarget) {
        return verticalTarget;
    }

    // If no consecutive hits are found in either direction, return the original coordinates
    return randomCoordinates(humanBoard);
            
}


export function computerMove(humanBoard) {
   
    let hitShips = findHitShips(humanBoard);
    console.log('findHitShip inside computerMove');
    console.log(hitShips)
    let row, col;

    if(hitShips) {
        console.log('hitShip true: '+hitShips)
       
        let newCoordinates = targetShip(hitShips, humanBoard)
        console.log('Targeting a ship');
        console.log(newCoordinates)
        row = newCoordinates[0];
        col = newCoordinates[1]
        
    } else {
        [row, col] = randomCoordinates(humanBoard);
    }
    
    
    

    return [row, col]
}






