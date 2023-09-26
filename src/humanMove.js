
import {renderHitCell, cellsEventListeners, renderGameMessage} from './ui.js';
import { handleAttackResult } from './eventHandlers.js';
import { computerMove } from './computerMove.js';

export function humanMove(computerBoard, humanBoard, humanTurn, resetTheGame) {
    let isGameOver = false;
 
    function gameOver() {
        isGameOver = true;
        console.log('game is over');
        resetTheGame();
        return
    }

    cellsEventListeners(computerBoard, (row, col) => {
        console.log('humanTurn is : '+humanTurn)
        if(humanTurn) {
            const attackResult = computerBoard.receiveAttack(row, col);
            console.log(attackResult)
            renderHitCell(computerBoard, row, col);
            handleAttackResult(attackResult, computerBoard, row, col, gameOver);
            humanTurn = false;
            renderGameMessage('Take Cover!');
            
            if(!isGameOver) {
                setTimeout(() => {
                    computerMove(humanBoard);
                    humanTurn = true;
                    renderGameMessage("Take Your Shot!")
                }, 2000); 
            } 
        } 
    });
}