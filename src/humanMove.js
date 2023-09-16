
import {renderHitCell, cellsEventListeners, renderGameMessage, renderSunkShip, renderWinningMessage} from './ui.js';
import { handleAttackResult } from './eventHandlers.js';
import { computerMove } from './computerMove.js';

export function humanMove(computerBoard, humanBoard, humanTurn) {
    
    cellsEventListeners(computerBoard, (row, col) => {
        console.log('humanTurn is : '+humanTurn)
        if(humanTurn) {
            const attackResult = computerBoard.receiveAttack(row, col);
            renderHitCell(computerBoard, row, col);
            handleAttackResult(attackResult, computerBoard, row, col);
            humanTurn = false;
            renderGameMessage('Take Cover!')
            setTimeout(() => {
                computerMove(humanBoard);
                humanTurn = true;
                renderGameMessage("Take Your Shot!")
            }, 1000); 
        }
    
    });

}