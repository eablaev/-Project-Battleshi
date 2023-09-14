import { createGameboard } from './createGameboard.js';
import { createPlayer } from './createPlayer.js';
import { placeComputerShips } from './placeComputerShips.js';
import { placeHumanShips } from './placeHumanShips.js';
import { renderGameboard, renderShip, getAxisValue, renderHitCell, cellsEventListeners, buttonEventListener, renderSunkShip, renderWinningMessage} from './ui.js';



 export function playGame() {

    return {
        start() {
            const human = createPlayer();
            const computer = createPlayer();

            const humanBoard = createGameboard();
            const computerBoard = createGameboard();

            renderGameboard(humanBoard.grid,"boardOne");
            renderGameboard(computerBoard.grid,"boardTwo");

            buttonEventListener('axisButton');

            placeComputerShips(computerBoard);
            placeHumanShips(humanBoard);

         

            function handleAttackResult(attackResult, board, row, col) {
                if(attackResult) {    
                    const shipId = board.grid[row][col].shipId;
                    const hitShip = board.ships.find(ship => ship.shipId === shipId);
                    if(hitShip.isSunk()) {
                        renderSunkShip(shipId);
                        if(board.allShipsSunk()) {
                            renderWinningMessage();
                            return true
                        }
                    }
                }
                return
            }

            function computerMove() {
                const col = Math.floor(Math.random() * 10); 
                const row = Math.floor(Math.random() * 10);
                while(humanBoard.grid[row][col].hit === true) {
                    return computerMove();
                } 
                const attackResult = humanBoard.receiveAttack(row, col); 
                renderHitCell('humanBoard', row, col);

                handleAttackResult(attackResult, humanBoard, row, col);
            }

            function humanMove() {
                cellsEventListeners(computerBoard, (row, col) => {
                const attackResult = computerBoard.receiveAttack(row, col);
                renderHitCell(computerBoard, row, col);
                handleAttackResult(attackResult, computerBoard, row, col);
                      
                    setTimeout(() => {
                        computerMove();
                      }, 1000); 
                });
               
            }

            humanMove()
                

        }
    }
}

const game = playGame();
game.start()