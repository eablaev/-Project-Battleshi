import { createGameboard } from './createGameboard.js';
import { placeComputerShips } from './placeComputerShips.js';
import { placeHumanShips } from './placeHumanShips.js';
import { renderGameboard, buttonEventListener, renderResetWindow, renderGameMessage} from './ui.js';
import { humanMove } from './humanMove.js';
import { handleAxisSwitch } from './eventHandlers.js';


export function playGame() {
    let humanBoard ;
    let computerBoard ;

    function resetTheGame() {
        console.log('reset');

        renderResetWindow();
        buttonEventListener('playAgainBtn', () => {
            game.start();
            const resetGameEl = document.getElementById('resetGame');
            resetGameEl.classList.remove('show')
        })
        
        
    }
    
    

    return {

        start() {
           
            let humanTurn = false;

            humanBoard = createGameboard();
            computerBoard = createGameboard();
            
            ///testing
            // const x = Math.floor(Math.random() *9)
            // const y = Math.floor(Math.random() *9)
            // humanBoard.placeShip(x, y, 1, 'horizontal');
            // computerBoard.placeShip(y, x, 1, 'horizontal');
            // humanTurn = true;
            
            /////

            renderGameboard(humanBoard.grid,"boardOne");
            renderGameboard(computerBoard.grid,"boardTwo");
            humanMove(computerBoard, humanBoard, humanTurn, resetTheGame)

            buttonEventListener('axisButton', handleAxisSwitch);

            placeComputerShips(computerBoard);
            console.log(computerBoard.grid)
            placeHumanShips(humanBoard, () => {
                renderGameMessage('Take Your Shot!')
                console.log('All human ships were placed');

                console.log(humanBoard.ships)
                humanTurn = true;
                humanMove(computerBoard, humanBoard, humanTurn, resetTheGame)
          });
        }
    }
}

const game = playGame();
game.start();