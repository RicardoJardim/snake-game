import { createRect } from "./utils";
import { IGameObject } from "./IGameObject";

export class Apple implements IGameObject {
  x: number;
  y: number;
  color: string;
  size: number;
  canvasContext;
  canvas;
  constructor(canvasContext, canvas, snake) {
    this.canvasContext = canvasContext;
    let isTouching;

    while (true) {
      isTouching = false;
      this.x =
        Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      this.y =
        Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
          isTouching = true;
        }
      }

      this.size = snake.size;
      this.color = "red";

      if (!isTouching) {
        break;
      }
    }
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  draw(): void {
    createRect(
      this.canvasContext,
      this.x,
      this.y,
      this.size,
      this.size,
      this.color
    );
  }
}
