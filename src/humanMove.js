
import {renderHitCell, cellsEventListeners, cellsRemoveEventListeners, buttonEventListener, renderSunkShip, renderWinningMessage} from './ui.js';
import { handleAttackResult } from './eventHandlers.js';
import { computerMove } from './computerMove.js';


export  function humanMove(computerBoard, humanBoard, humanTurn) {
    cellsEventListeners(computerBoard, (row, col) => {
    const attackResult = computerBoard.receiveAttack(row, col);
    renderHitCell(computerBoard, row, col);
    handleAttackResult(attackResult, computerBoard, row, col);
    
          
    // setTimeout(() => {
    //     computerMove(humanBoard);
    // }, 1000); 

    return true
    });
 
}

// add eventlistener
//listen to the click
//when clicked check if its human turn
//if yes execute attack