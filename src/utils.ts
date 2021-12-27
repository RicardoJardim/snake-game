export function createRect(canvasContext, x, y, width, height, color): void {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}
