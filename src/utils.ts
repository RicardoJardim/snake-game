export function createRect(canvasContext, x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}
