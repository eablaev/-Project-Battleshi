import { renderHitCell } from "./ui.js";
import { handleAttackResult } from "./eventHandlers.js";

export function computerMove(humanBoard) {
    let col, row, attackResult;
    do {
        col = Math.floor(Math.random() * 10); 
        row = Math.floor(Math.random() * 10);
    } while (humanBoard.grid[row][col].hit === true);
    
    attackResult = humanBoard.receiveAttack(row, col); 
    renderHitCell('humanBoard', row, col);

    handleAttackResult(attackResult, humanBoard, row, col);
}
