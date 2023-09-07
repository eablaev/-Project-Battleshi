import { createGameboard } from './createGameboard.js';
import { createPlayer } from './createPlayer.js';
import { renderGameboard, cellsEventListeners, renderSunkShip, renderWinningMessage} from './ui.js';

 export function playGame() {

    return {
        start() {
            const human = createPlayer();
            const computer = createPlayer();

            const humanBoard = createGameboard();
            humanBoard.placeShip(0, 0, 4, 'horizontal');
            humanBoard.placeShip(0, 5, 4, 'vertical');
            humanBoard.placeShip(6, 5, 3, 'vertical');
            humanBoard.placeShip(3, 3, 3, 'vertical');
            humanBoard.placeShip(5, 7, 2, 'horizontal');
            humanBoard.placeShip(8, 0, 2, 'vertical');
          
            const computerBoard = createGameboard();
            computerBoard.placeShip(1, 0, 4, 'vertical');
            computerBoard.placeShip(0, 5, 4, 'horizontal');
            computerBoard.placeShip(6, 5, 3, 'horizontal');
            computerBoard.placeShip(3, 3, 3, 'horizontal');
            computerBoard.placeShip(5, 7, 2, 'horizontal');
            computerBoard.placeShip(8, 0, 2, 'horizontal');

            renderGameboard(humanBoard.grid,"boardOne");
            renderGameboard(computerBoard.grid,"boardTwo");

            function startTurn(currentPlayer) {
                const currentBoard = currentPlayer === 'human' ? computerBoard : humanBoard ;

                cellsEventListeners(currentBoard,(row, col) => {
                const attackResult = currentBoard.receiveAttack(row, col);
                console.log(attackResult)
                    if(attackResult) {
                        const shipId = currentBoard.grid[row][col].shipId;
                        const hitShip = currentBoard.ships.find(ship => ship.shipId === shipId);
                        if(hitShip.isSunk()) {
                            renderSunkShip(shipId);
                            if(currentBoard.allShipsSunk()) {
                                renderWinningMessage()
                            }
                        }
                    }  
                });
            }
            startTurn('human');

            
            //1 human placing their ships based on UI
            //2 computer placing their ships automatically at random;
            //3 Human attacks
            //4 check if there is a hit
            //5 if(hit) check if allShipsSunk()
            //7 if !allShipsSunk() go back to 3;
            //8 if(miss) mark missed location;
            //9 switch turns

            //10 computer attacks:
            //11 check if there is a hit
            //12 if(hit) check if allShipsSunk()
            //13 if !allShipsSunk() go back to 7
            //14 if(miss) mark missed location
            //15 switch turns
        }
    }
}

const game = playGame();
game.start()