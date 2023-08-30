const createGameboard = require("./createGameboard");
const createPlayer = require("./createPlayer");



function playGame() {
    return {
        start() {
            const human = createPlayer();
            const computer = createPlayer();

            const humanBoard = createGameboard();
            const computerBoard = createGameboard();

            

        }

    }
}

module.exports = playGame;