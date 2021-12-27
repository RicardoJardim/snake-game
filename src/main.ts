interface IGameObject {
  x: number;
  y: number;
  update(): void;
  draw(): void;
}

type EndGame = {
  won: boolean;
  message: string;
};

//#region Game

class Game {
  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  score: HTMLElement;

  static snake: Snake;
  apple: IGameObject;

  GameID: number;

  constructor(
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D,
    score: HTMLElement
  ) {
    this.canvas = canvas;
    this.score = score;
    this.canvasContext = canvasContext;

    Game.snake = new Snake(this.canvasContext, this.canvas, 20, 20, 20);
    this.apple = new Apple(this.canvasContext, this.canvas, Game.snake.size);
  }

  gameLoop(callback: Function): void {
    let size =
      (this.canvas.width * this.canvas.height) /
      (Game.snake.size * Game.snake.size);

    console.log(size);
    this.GameID = setInterval(() => {
      if (Game.snake.die) {
        this.stopGame();
        let endgame: EndGame = { won: false, message: "Dead" };
        callback(endgame);
      } else if (Game.snake.tail.length >= size) {
        this.stopGame();
        let endgame: EndGame = { won: true, message: "You won the game" };
        callback(endgame);
      } else {
        this.update();
        this.draw();
      }
    }, 1000 / 10);
  }

  stopGame(): void {
    clearInterval(this.GameID);
  }

  movementEvents(event: KeyboardEvent): void {
    if (event.key == "ArrowLeft" && Game.snake.rotateX != 1) {
      Game.snake.rotateX = -1;
      Game.snake.rotateY = 0;
    } else if (event.key == "ArrowUp" && Game.snake.rotateY != 1) {
      Game.snake.rotateX = 0;
      Game.snake.rotateY = -1;
    } else if (event.key == "ArrowRight" && Game.snake.rotateX != -1) {
      Game.snake.rotateX = 1;
      Game.snake.rotateY = 0;
    } else if (event.key == "ArrowDown" && Game.snake.rotateY != -1) {
      Game.snake.rotateX = 0;
      Game.snake.rotateY = 1;
    }
  }

  private draw(): void {
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
    Game.snake.draw();
    this.apple.draw();
  }

  private update(): void {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Game.snake.update();
    this.eatApple();
  }

  private eatApple(): void {
    if (
      Game.snake.tail[Game.snake.tail.length - 1].x == this.apple.x &&
      Game.snake.tail[Game.snake.tail.length - 1].y == this.apple.y
    ) {
      Game.snake.tail[Game.snake.tail.length] = {
        x: this.apple.x,
        y: this.apple.y,
      };
      this.apple = new Apple(this.canvasContext, this.canvas, Game.snake.size);
      this.score.innerHTML = `${Game.snake.tail.length - 1}`;
    }
  }
}
//#endregion

//#region Apple

class Apple implements IGameObject {
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
//#endregion

//#region SNAKE
class Snake implements IGameObject {
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

//#endregion

function createRect(canvasContext, x, y, width, height, color): void {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");
const score: HTMLElement = document.getElementById("score");

var game: Game;

window.onload = () => {
  window.addEventListener("keydown", (event) => {
    game.movementEvents(event);
  });
};

function startgame(el: HTMLElement) {
  if (game != null) {
    game.stopGame();
    game = null;
  }
  el.innerText = "Reset";
  game = new Game(canvas, canvasContext, score);

  game.gameLoop((data: EndGame) => {
    if (!data.won) {
      writeCanvas(data.message, "red");
    } else {
      writeCanvas(data.message, "green");
    }
  });
}

function writeCanvas(message, color) {
  canvasContext.save();

  canvasContext.font = "48px Arial";

  canvasContext.textBaseline = "top";

  canvasContext.fillStyle = color;

  let width = canvasContext.measureText(message).width;

  let x = canvas.width / 2 - width / 2;

  canvasContext.fillRect(x, 100, width, parseInt("48px Arial", 10));

  canvasContext.fillStyle = "#fff";

  canvasContext.fillText(message, x, 100);

  canvasContext.restore();
}
