import { createGameboard } from './createGameboard.js';
import { createPlayer } from './createPlayer.js';
import { placeComputerShips } from './placeComputerShips.js';
import { placeHumanShips } from './placeHumanShips.js';
import { renderGameboard, buttonEventListener, renderResetWindow} from './ui.js';
import { humanMove } from './humanMove.js';
import { handleAxisSwitch } from './eventHandlers.js';


export function playGame() {
    let humanBoard ;
    let computerBoard ;

    function resetTheGame() {
        // game.reset();
        console.log('reset');

        renderResetWindow();
        buttonEventListener('playAgainBtn', () => {
            game.start();
            const resetGameEl = document.getElementById('resetGame');
            console.log(resetGameEl)
            resetGameEl.classList.remove('show')
        })
        
        
    }
    function createEmptyGrid() {
        let grid = [];
        for(let row = 0; row < 10; row++) {
            const rowArray = [];
            for(let col = 0; col < 10; col ++) {
                rowArray.push({
                    shipId: null,
                    hit: false
                });
            }
            grid.push(rowArray);
        }
        return grid;
    }
    

    return {
        // reset() {
        //     console.log('main reset');
        //     const boards = document.getElementById('gameboardsContainer');
        //     // console.log(boards)
        //     humanBoard.grid = createEmptyGrid()
        //     // console.log(humanBoard.grid)
        //     // humanBoard.grid = createEmptyGrid();
        //     // computerBoard.grid = createEmptyGrid();
        //     // renderGameboard(humanBoard.grid,"boardOne");
        //     // renderGameboard(computerBoard.grid,"boardTwo");
        //     game.start()
        // },
       
        start() {
           
            let humanTurn = false;

            humanBoard = createGameboard();
            computerBoard = createGameboard();
            
            ///testing
            const x = Math.floor(Math.random() *9)
            const y = Math.floor(Math.random() *9)
            humanBoard.placeShip(x, y, 1, 'horizontal');
            computerBoard.placeShip(y, x, 1, 'horizontal');
            humanTurn = true;
            
            /////

            renderGameboard(humanBoard.grid,"boardOne");
            renderGameboard(computerBoard.grid,"boardTwo");
            humanMove(computerBoard, humanBoard, humanTurn, resetTheGame)

            buttonEventListener('axisButton', handleAxisSwitch);

        //     placeComputerShips(computerBoard);
        //     placeHumanShips(humanBoard, () => {
        //         renderGameMessage('Take Your Shot!')
        //         console.log('All human ships were placed');

        //         console.log(humanBoard.ships)
        //         humanTurn = true;
        //         humanMove(computerBoard, humanBoard, humanTurn, resetTheGame)
        //   });
        }
    }
}

const game = playGame();
game.start();