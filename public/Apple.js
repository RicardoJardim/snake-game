"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apple = void 0;
const utils_1 = require("./utils");
class Apple {
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
    update() {
        throw new Error("Method not implemented.");
    }
    draw() {
        (0, utils_1.createRect)(this.canvasContext, this.x, this.y, this.size, this.size, this.color);
    }
}
exports.Apple = Apple;
//# sourceMappingURL=Apple.js.map