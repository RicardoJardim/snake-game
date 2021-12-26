"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Apple_1 = require("./Apple");
const Snake_1 = require("./Snake");
class Game {
    constructor(canvas, canvasContext) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        Game.snake = new Snake_1.Snake(this.canvasContext, this.canvas, 20, 20, 20);
        this.apple = new Apple_1.Apple(this.canvasContext, this.canvas, Game.snake);
    }
    gameLoop() {
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / 20);
    }
    draw() {
        Game.snake.draw();
        this.apple.draw();
    }
    update() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Game.snake.update();
        this.eatApple();
        this.checkHitWall();
    }
    eatApple() {
        if (Game.snake.tail[Game.snake.tail.length - 1].x == this.apple.x &&
            Game.snake.tail[Game.snake.tail.length - 1].y == this.apple.y) {
            Game.snake.tail[Game.snake.tail.length] = {
                x: this.apple.x,
                y: this.apple.y,
            };
            this.apple = new Apple_1.Apple(this.canvasContext, this.canvas, Game.snake);
        }
    }
    checkHitWall() {
        let headTail = Game.snake.tail[Game.snake.tail.length - 1];
        if (headTail.x == -Game.snake.size) {
            headTail.x = this.canvas.width - Game.snake.size;
        }
        else if (headTail.x == this.canvas.widh) {
            headTail.x = 0;
        }
        else if (headTail.y == -Game.snake.size) {
            headTail.y = this.canvas.height - Game.snake.size;
        }
        else if (headTail.y == this.canvas.height) {
            headTail.y = 0;
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map