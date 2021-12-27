import { Apple } from "./Apple";
import { IGameObject } from "./IGameObject";
import { Snake } from "./Snake";
import { createRect } from "./utils";

export type EndGame = {
  won: boolean;
  message: string;
  score?: number;
};

export class Game {
  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  score: HTMLElement;

  static snake: Snake;
  apple: IGameObject;

  GameID: NodeJS.Timer;

  constructor(
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D,
    score: HTMLElement
  ) {
    this.canvas = canvas;
    this.score = score;
    this.canvasContext = canvasContext;

    Game.snake = new Snake(this.canvasContext, this.canvas, 20, 20, 20);
    this.apple = new Apple(this.canvasContext, this.canvas, Game.snake.size);
  }

  gameLoop(callback: Function): void {
    let size =
      (this.canvas.width * this.canvas.height) /
      (Game.snake.size * Game.snake.size);

    this.GameID = setInterval(() => {
      if (Game.snake.die) {
        this.stopGame();
        let endgame: EndGame = {
          won: false,
          message: "Dead",
          score: parseInt(this.score.innerHTML),
        };
        callback(endgame);
      } else if (Game.snake.tail.length >= size) {
        this.stopGame();
        let endgame: EndGame = {
          won: true,
          message: "You won the game",
          score: parseInt(this.score.innerHTML),
        };
        callback(endgame);
      } else {
        this.update();
        this.draw();
      }
    }, 1000 / 10);
  }

  stopGame(): void {
    clearInterval(this.GameID);
  }

  movementEvents(event: KeyboardEvent): void {
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
  }

  private draw(): void {
    createRect(
      this.canvasContext,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      "black"
    );
    createRect(
      this.canvasContext,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      ""
    );
    Game.snake.draw();
    this.apple.draw();
  }

  private update(): void {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Game.snake.update();
    this.eatApple();
  }

  private eatApple(): void {
    if (
      Game.snake.tail[Game.snake.tail.length - 1].x == this.apple.x &&
      Game.snake.tail[Game.snake.tail.length - 1].y == this.apple.y
    ) {
      Game.snake.tail[Game.snake.tail.length] = {
        x: this.apple.x,
        y: this.apple.y,
      };
      this.apple = new Apple(this.canvasContext, this.canvas, Game.snake.size);
      this.score.innerHTML = `${Game.snake.tail.length - 1}`;
    }
  }
}
