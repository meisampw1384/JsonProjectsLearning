let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.screen = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.mouse = {
  x: screen.width / 2,
  y: screen.height / 2,
};

function getRandInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Ball {
  constructor(x, y, dx, dy, r, color) {
    this.friction = .8;
    this.gravity = 1;
    this.r = r || 10;
    this.x = x || getRandInteger(this.r, window.innerWidth - this.r);
    this.y = y || getRandInteger(this.r, window.innerHeight - this.r);
    this.dx = dx || (Math.random() - 0.5) * 4;
    this.dy = dy || (Math.random() - 0.5) * 4;
    this.color = color || `rgb(231,76,60,${Math.random()})`;
    this.draw();
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fillStyle = "red";
    c.fill();
  }
  
  update() {
    this.y += this.dy;
    this.x += this.dx;
    if (this.y + this.r + this.dy >=screen.height){
        this.dy = -this.dy*this.friction;
    }
    else {
        this.dy += this.gravity;
    }
    this.draw();
  }
}

class Canvas {
  constructor() {
    this.balls = [];
    for (let i = 0; i < 100; i++) {
      this.balls.push(new Ball());
    }
  }

  animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.balls.forEach((ball) => {
      ball.update();
    });
    requestAnimationFrame(this.animate.bind(this));
  }
}

let mycan = new Canvas();
mycan.animate();

window.addEventListener("click", (event) => {
  mycan.balls.push(new Ball(event.clientX, event.clientY));
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
