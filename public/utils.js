"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRect = void 0;
function createRect(canvasContext, x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}
exports.createRect = createRect;
//# sourceMappingURL=utils.js.map