import { createGameboard } from './createGameboard.js';
import { createPlayer } from './createPlayer.js';
import { placeComputerShips } from './placeComputerShips.js';
import { placeHumanShips } from './placeHumanShips.js';
import { renderGameboard, buttonEventListener, renderGameMessage} from './ui.js';
import { humanMove } from './humanMove.js';

export function playGame() {

    return {
        start() {
            const human = createPlayer();
            const computer = createPlayer();
            let humanTurn = false;

            const humanBoard = createGameboard();
            const computerBoard = createGameboard();

            renderGameboard(humanBoard.grid,"boardOne");
            renderGameboard(computerBoard.grid,"boardTwo");

            buttonEventListener('axisButton');

            placeComputerShips(computerBoard);
            placeHumanShips(humanBoard, () => {
                renderGameMessage('Take Your Shot!')
                console.log('All human ships were placed');

                console.log(humanBoard.ships)
                humanTurn = true;
                humanMove(computerBoard, humanBoard, humanTurn)
          });
        }
    }
}

const game = playGame();
game.start();