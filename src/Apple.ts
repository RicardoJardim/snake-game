import { createRect } from "./utils";
import { IGameObject } from "./IGameObject";

export class Apple implements IGameObject {
  x: number;
  y: number;
  color: string;
  size: number;
  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  constructor(
    canvasContext: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    size: number
  ) {
    this.canvasContext = canvasContext;
    this.canvas = canvas;
    this.size = size;
    this.size = this.size;

    this.x =
      Math.floor((Math.random() * this.canvas.width) / this.size) * this.size;
    this.y =
      Math.floor((Math.random() * this.canvas.height) / this.size) * this.size;

    this.color = "red";
  }
  update(): void {}
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
