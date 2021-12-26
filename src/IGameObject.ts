export interface IGameObject {
  x: number;
  y: number;
  update(): void;
  draw(): void;
}
