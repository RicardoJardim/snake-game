import { IGameObject } from "./IGameObject";
import { createRect } from "./utils";

export class Snake implements IGameObject {
  x: number;
  y: number;
  tail: { x: number; y: number }[];
  size: number;
  rotateX: number;
  rotateY: number;
  canvasContext;
  canvas;

  constructor(canvasContext, canvas, x, y, size) {
    this.canvasContext = canvasContext;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.size = size;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 0;
    this.rotateY = 1;
  }
  update(): void {
    this.move();
  }
  draw(): void {
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

    for (let i = 0; i < this.tail.length; i++) {
      createRect(
        this.canvasContext,
        this.tail[i].x + 2.5,
        this.tail[i].y + 2.5,
        this.size - 5,
        this.size - 5,
        "white"
      );
    }

    this.canvasContext.font = "20px Arial";
    this.canvasContext.fillStyle = "#00FF42";
    this.canvasContext.fillText(
      "Score: " + (this.tail.length - 1),
      this.canvas.width - 120,
      18
    );
  }

  private move() {
    let newRect;

    if (this.rotateX == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateX == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}
