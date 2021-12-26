class Game {
    constructor(canvas, canvasContext, score) {
        this.canvas = canvas;
        this.score = score;
        this.canvasContext = canvasContext;
        Game.snake = new Snake(this.canvasContext, this.canvas, 20, 20, 20);
        this.apple = new Apple(this.canvasContext, this.canvas, Game.snake.size);
    }
    gameLoop(callback) {
        let Gameid = setInterval(() => {
            if (Game.snake.die == true) {
                clearInterval(Gameid);
                let endgame = { won: true, message: "morreu" };
                callback(endgame);
            }
            else {
                this.update();
                this.draw();
            }
        }, 1000 / 10);
    }
    movementEvents(event) {
        if (event.key == "ArrowLeft" && Game.snake.rotateX != 1) {
            Game.snake.rotateX = -1;
            Game.snake.rotateY = 0;
        }
        else if (event.key == "ArrowUp" && Game.snake.rotateY != 1) {
            Game.snake.rotateX = 0;
            Game.snake.rotateY = -1;
        }
        else if (event.key == "ArrowRight" && Game.snake.rotateX != -1) {
            Game.snake.rotateX = 1;
            Game.snake.rotateY = 0;
        }
        else if (event.key == "ArrowDown" && Game.snake.rotateY != -1) {
            Game.snake.rotateX = 0;
            Game.snake.rotateY = 1;
        }
    }
    draw() {
        createRect(this.canvasContext, 0, 0, this.canvas.width, this.canvas.height, "black");
        createRect(this.canvasContext, 0, 0, this.canvas.width, this.canvas.height, "");
        Game.snake.draw();
        this.apple.draw();
    }
    update() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Game.snake.update();
        this.eatApple();
    }
    eatApple() {
        if (Game.snake.tail[Game.snake.tail.length - 1].x == this.apple.x &&
            Game.snake.tail[Game.snake.tail.length - 1].y == this.apple.y) {
            Game.snake.tail[Game.snake.tail.length] = {
                x: this.apple.x,
                y: this.apple.y,
            };
            this.apple = new Apple(this.canvasContext, this.canvas, Game.snake.size);
            this.score.innerHTML = `${Game.snake.tail.length - 1}`;
        }
    }
}
class Apple {
    constructor(canvasContext, canvas, size) {
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
    update() { }
    draw() {
        createRect(this.canvasContext, this.x, this.y, this.size, this.size, this.color);
    }
}
class Snake {
    constructor(canvasContext, canvas, x, y, size) {
        this.die = false;
        this.canvasContext = canvasContext;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 0;
        this.rotateY = 1;
    }
    update() {
        this.move();
        this.checkHitWall();
        this.checkHitSnake();
    }
    draw() {
        for (let i = 0; i < this.tail.length; i++) {
            createRect(this.canvasContext, this.tail[i].x + 2.5, this.tail[i].y + 2.5, this.size - 5, this.size - 5, "white");
        }
    }
    move() {
        let newRect;
        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y,
            };
        }
        else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y,
            };
        }
        else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size,
            };
        }
        else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size,
            };
        }
        this.tail.shift();
        this.tail.push(newRect);
    }
    checkHitWall() {
        let headTail = this.tail[this.tail.length - 1];
        if (headTail.x == -this.size) {
            headTail.x = this.canvas.width - this.size;
        }
        else if (headTail.x == this.canvas.width) {
            headTail.x = 0;
        }
        else if (headTail.y == -this.size) {
            headTail.y = this.canvas.height - this.size;
        }
        else if (headTail.y == this.canvas.height) {
            headTail.y = 0;
        }
    }
    checkHitSnake() {
        let head = this.tail[this.tail.length - 1];
        if (this.tail.filter((e) => e.x == head.x && e.y == head.y).length > 1) {
            this.die = true;
        }
    }
}
function createRect(canvasContext, x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const score = document.getElementById("score");
window.onload = () => {
    var game = new Game(canvas, canvasContext, score);
    game.gameLoop((data) => {
        if (!data.won) {
            alert("FAILED: " + data.message);
        }
        else {
            alert(data.message);
        }
    });
    window.addEventListener("keydown", (event) => {
        game.movementEvents(event);
    });
};
//# sourceMappingURL=main.js.map