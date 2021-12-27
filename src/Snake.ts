import { IGameObject } from "./IGameObject";
import { createRect } from "./utils";
export class Snake implements IGameObject {
  x: number;
  y: number;
  die: boolean = false;
  tail: { x: number; y: number }[];
  size: number;
  rotateX: number;
  rotateY: number;
  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(
    canvasContext: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    size: number
  ) {
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
    this.checkHitWall();
    this.checkHitSnake();
  }
  draw(): void {
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

  private checkHitWall(): void {
    let headTail = this.tail[this.tail.length - 1];

    if (headTail.x == -this.size) {
      headTail.x = this.canvas.width - this.size;
    } else if (headTail.x == this.canvas.width) {
      headTail.x = 0;
    } else if (headTail.y == -this.size) {
      headTail.y = this.canvas.height - this.size;
    } else if (headTail.y == this.canvas.height) {
      headTail.y = 0;
    }
  }

  private checkHitSnake(): void {
    let head = this.tail[this.tail.length - 1];

    if (this.tail.filter((e) => e.x == head.x && e.y == head.y).length > 1) {
      this.die = true;
    }
  }
}
