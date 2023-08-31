import { createGameboard } from './createGameboard.js';
import { createPlayer } from './createPlayer.js';



 export function playGame() {
   
    return {
        start() {
            const human = createPlayer();
            const computer = createPlayer();

            const humanBoard = createGameboard();
            const computerBoard = createGameboard();

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

