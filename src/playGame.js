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
            humanBoard.id = 'humanBoard'
            computerBoard = createGameboard();
            computerBoard.id = 'computerBoard'
            
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
            console.log(computerBoard.ships)
            placeHumanShips(humanBoard, () => {
                /////testing////
                // document.getElementById('boardOne').querySelector('[data-row="0"][data-col="1"]').classList.add('hit');
                // document.getElementById('boardOne').querySelector('[data-row="0"][data-col="2"]').classList.add('hit');
                // document.getElementById('boardOne').querySelector('[data-row="0"][data-col="3"]').classList.add('hit');
                // humanBoard.grid[0][1].hit = true;
                // humanBoard.grid[0][2].hit = true;
                // humanBoard.grid[0][3].hit = true;
               
                //////
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