import { createGameboard } from './createGameboard.js';
import { createPlayer } from './createPlayer.js';
import { renderGameboard, renderShip, renderHitCell, cellsEventListeners, buttonEventListener, renderSunkShip, renderWinningMessage} from './ui.js';

 export function playGame() {

    return {
        start() {
            const human = createPlayer();
            const computer = createPlayer();


            const humanBoard = createGameboard();
            buttonEventListener('axisButton',(input) => {
                console.log(input)
            })
            cellsEventListeners('humanBoard', (row, col) => {
                
                if (humanBoard.placeShip(row, col, 4, 'horizontal')) {
                    renderShip('humanBoard', row, col, 4, 'horizontal') 
                }; 
            }); 
            
            // humanBoard.placeShip(0, 0, 4, 'horizontal');
            // humanBoard.placeShip(0, 5, 4, 'vertical');
            // humanBoard.placeShip(6, 5, 3, 'vertical');
            // humanBoard.placeShip(3, 3, 3, 'vertical');
            // humanBoard.placeShip(5, 7, 2, 'horizontal');
            // humanBoard.placeShip(8, 0, 2, 'vertical');
          
            const computerBoard = createGameboard();
            computerBoard.placeShip(1, 0, 4, 'vertical');
            computerBoard.placeShip(0, 5, 4, 'horizontal');
            computerBoard.placeShip(6, 5, 3, 'horizontal');
            computerBoard.placeShip(3, 3, 3, 'horizontal');
            computerBoard.placeShip(5, 7, 2, 'horizontal');
            computerBoard.placeShip(8, 0, 2, 'horizontal');

            renderGameboard(humanBoard.grid,"boardOne");
            renderGameboard(computerBoard.grid,"boardTwo");

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