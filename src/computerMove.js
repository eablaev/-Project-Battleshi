import { renderHitCell } from "./ui.js";
import { handleAttackResult } from "./eventHandlers.js";

export function computerMove(humanBoard) {
    const col = Math.floor(Math.random() * 10); 
    const row = Math.floor(Math.random() * 10);
    while(humanBoard.grid[row][col].hit === true) {
        return computerMove();
    } 
    const attackResult = humanBoard.receiveAttack(row, col); 
    renderHitCell('humanBoard', row, col);

    handleAttackResult(attackResult, humanBoard, row, col);
}
