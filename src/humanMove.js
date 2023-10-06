
import {renderHitCell, cellsEventListeners, renderGameMessage} from './ui.js';
import { handleAttackResult } from './eventHandlers.js';
import { computerMove } from './computerMove.js';

export function humanMove(computerBoard, humanBoard, humanTurn, resetTheGame) {
    let isGameOver = false;
 
    function gameOver(id) {
        console.log('GameOver id is :'+id)
        isGameOver = true;
        console.log('game is over');
        resetTheGame(id);
        return
    }

    cellsEventListeners(computerBoard, (row, col) => {
        //test
        // gameOver(humanBoard.id)
        //test
        console.log('humanTurn is : '+humanTurn)
        if(humanTurn) {
            const attackResult = computerBoard.receiveAttack(row, col);
            console.log(attackResult)
            renderHitCell('computerBoard', row, col);
            handleAttackResult(attackResult, computerBoard, row, col, gameOver);
            humanTurn = false;
            renderGameMessage('Take Cover!');
           
            if(!isGameOver) {
                setTimeout(() => {
                    const [row, col] =  computerMove(humanBoard);
                    const attackResultComp = humanBoard.receiveAttack(row, col);
                    console.log(attackResultComp);
                    renderHitCell('humanBoard' , row, col);
                    handleAttackResult(attackResultComp, humanBoard, row, col, gameOver);
                
                    humanTurn = true;
                    renderGameMessage("Take Your Shot!")
                }, 2000); 
            } 
        } 
    });
}