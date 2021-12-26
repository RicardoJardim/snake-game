"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
var game;
window.onload = () => {
    game = new Game_1.Game(canvas, canvasContext);
    game.gameLoop();
    window.addEventListener("keydown", (event) => {
        setTimeout(() => {
            if (event.key == "ArrowLeft" && Game_1.Game.snake.rotateX != 1) {
                Game_1.Game.snake.rotateX = -1;
                Game_1.Game.snake.rotateY = 0;
            }
            else if (event.key == "ArrowUp" && Game_1.Game.snake.rotateY != 1) {
                Game_1.Game.snake.rotateX = 0;
                Game_1.Game.snake.rotateY = -1;
            }
            else if (event.key == "ArrowRight" && Game_1.Game.snake.rotateX != -1) {
                Game_1.Game.snake.rotateX = 1;
                Game_1.Game.snake.rotateY = 0;
            }
            else if (event.key == "ArrowDown" && Game_1.Game.snake.rotateY != -1) {
                Game_1.Game.snake.rotateX = 0;
                Game_1.Game.snake.rotateY = 1;
            }
        }, 1);
    });
};
//# sourceMappingURL=index.js.map