import { Game } from "./Game";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
var game;
window.onload = () => {
  game = new Game(canvas, canvasContext);
  game.gameLoop();

  window.addEventListener("keydown", (event) => {
    setTimeout(() => {
      if (event.key == "ArrowLeft" && Game.snake.rotateX != 1) {
        Game.snake.rotateX = -1;
        Game.snake.rotateY = 0;
      } else if (event.key == "ArrowUp" && Game.snake.rotateY != 1) {
        Game.snake.rotateX = 0;
        Game.snake.rotateY = -1;
      } else if (event.key == "ArrowRight" && Game.snake.rotateX != -1) {
        Game.snake.rotateX = 1;
        Game.snake.rotateY = 0;
      } else if (event.key == "ArrowDown" && Game.snake.rotateY != -1) {
        Game.snake.rotateX = 0;
        Game.snake.rotateY = 1;
      }
    }, 1);
  });
};
