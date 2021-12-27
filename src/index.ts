import { Game, EndGame } from "./Game";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const btn = document.getElementById("btn");
const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");
const score: HTMLElement = document.getElementById("score");
const scoreMax: HTMLElement = document.getElementById("scoreMax");

var game: Game;

window.onload = () => {
  window.addEventListener("keydown", (event) => {
    game.movementEvents(event);
  });
};

btn.addEventListener("click", (el) => {
  if (game != null) {
    game.stopGame();
    game = null;
  }
  btn.innerText = "Reset";
  game = new Game(canvas, canvasContext, score);

  game.gameLoop((data: EndGame) => {
    if (data.score > parseInt(scoreMax.innerHTML)) {
      scoreMax.innerHTML = `${data.score}`;
    }

    if (!data.won) {
      writeCanvas(data.message, "red");
    } else {
      writeCanvas(data.message, "green");
    }
  });
});

function writeCanvas(message, color) {
  canvasContext.save();

  canvasContext.font = "48px Arial";

  canvasContext.textBaseline = "top";

  canvasContext.fillStyle = color;

  let width = canvasContext.measureText(message).width;

  let x = canvas.width / 2 - width / 2;

  canvasContext.fillRect(x, 100, width, parseInt("48px Arial", 10));

  canvasContext.fillStyle = "#fff";

  canvasContext.fillText(message, x, 100);

  canvasContext.restore();
}
