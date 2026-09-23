import { setupControls } from './actions/paddleMove.js';

const board = document.getElementById('canvas');
const ctx = board.getContext("2d");
const timerDisplay = document.getElementById("score");
const startBtn = document.getElementById("btn-start");

let seconds=0;
let timerInterval=null;
let gameAnimationId = null;
let isRunning = false;

const paddle = {
    width: 100,
    height: 7,
    x: 0,
    y: 0,
    speed: 7,
    dx: 0
};

setupControls(paddle);

const ball = {
    x: 0,
    y: 0,
    radius: 5,
    speed: 4,
    dx: 0,
    dy: 0
};

/**
 * Dessine la raquette de jeu
 */
function drawPaddle() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

/**
 * Dessine la balle
 */
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

/**
 * Demare le jeu en positionnant les element et l'angle de la balle
 */
function startGame(){
    timerDisplay.textContent = "Score : 0 s";

    paddle.x = (board.width - paddle.width) / 2;
    paddle.y = board.height - paddle.height - 5;


    ball.x = board.width / 2;
    ball.y = paddle.y - ball.radius;


    const angle = (Math.random() * 0.8 - 0.4) * Math.PI;
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);


    ctx.clearRect(0, 0, board.width, board.height);
    drawPaddle();
    drawBall();
}

/**
 * Mise a jour des positions de la raquette et de la ball avec les collions
 */
function update() {
    paddle.x += paddle.dx;

    // bloque raquette dans canvas
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > board.width) {
        paddle.x = board.width - paddle.width;
    }

    // dep de la balle
    ball.x += ball.dx;
    ball.y += ball.dy;

    // collision
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > board.width) {
        ball.dx *= -1;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // collision raquette
    if (
        ball.y + ball.radius >= paddle.y &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
    ) {
        ball.dy = -Math.abs(ball.dy);

        //augmentation de la vitesse
        if (Math.abs(ball.dy) < 20) {
            ball.dx *= 1.1;
            ball.dy *= 1.1;
        }
    }

    if (ball.y - ball.radius > board.height) {
        gameOver();
    }
}

/**
 * boucle de jeu
 */
function gameLoop() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, board.width, board.height);

    update();
    drawPaddle();
    drawBall();

    gameAnimationId = requestAnimationFrame(gameLoop);
}

/**
 * evenement quand le joueur perd
 */
function gameOver() {
    isRunning = false;
    clearInterval(timerInterval);
    timerDisplay.textContent = `Score : ${seconds} s`;
    cancelAnimationFrame(gameAnimationId);

    const bestScore = localStorage.getItem("soloPong_bestScore") || 0;
    if (seconds > bestScore) {
        localStorage.setItem("soloPong_bestScore", seconds);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Partie terminée !", board.width / 2, board.height / 2 - 10);
    ctx.font = "16px Arial";
    ctx.fillText(`Score final : ${seconds} s`, board.width / 2, board.height / 2 + 20);
}

function startTimer(){
    timerInterval = setInterval(()=>{
        seconds++;
        timerDisplay.textContent = `Score : ${seconds} s`;
    },1000)
}

startBtn.addEventListener("click", () => {
    isRunning = true;
    startGame();
    startTimer();
    gameLoop();
});