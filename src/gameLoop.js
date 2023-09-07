import { cellsEventListeners } from "./ui.js";

export function gameLoop () {
    cellsEventListeners((row,col) => {
        console.log(row)
    })
}