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
    const result = [];
    board.grid.forEach((row, rowIndex) => {
       row.forEach((cell, colIndex) => {
            if(cell.shipId && cell.hit) {
                result.push([rowIndex, colIndex])
            }
       })  
    });
    return result
}

export function  targetShip(coordinates, board) {
    let [row, col] = coordinates;
    let newRow, newCol; 
    if(row > 0 && board.grid[row-1] && board.grid[row-1][col].hit === false) {
        newRow = row-1;
        newCol = col;  
    } else if(row < 9 && board.grid[row+1] && board.grid[row+1][col].hit === false){
        newRow = row+1;
        newCol = col;  
    }else if(row > 0 && board.grid[col-1] && board.grid[row][col-1].hit === false){
        newRow = row;
        newCol = col-1;  
    }else if(col < 9 && board.grid[col+1] && board.grid[row][col+1].hit === false){
        newRow = row;
        newCol = col+1;  
    }
    return [newRow, newCol]
}

export function computerMove(humanBoard) {
 
    const [row, col] = randomCoordinates(humanBoard);
    attackResult = humanBoard.receiveAttack(row, col); 
    renderHitCell('humanBoard', row, col);

    handleAttackResult(attackResult, humanBoard, row, col);
}
