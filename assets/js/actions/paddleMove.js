export function setupControls(paddle) {
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "Left") {
            paddle.dx = -paddle.speed;
        } else if (e.key === "ArrowRight" || e.key === "Right") {
            paddle.dx = paddle.speed;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (["ArrowLeft", "Left", "ArrowRight", "Right"].includes(e.key)) {
            paddle.dx = 0;
        }
    });

    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");

    if (btnLeft && btnRight) {
        btnLeft.addEventListener("touchstart", (e) => {
            e.preventDefault();
            paddle.dx = -paddle.speed;
        });
        btnLeft.addEventListener("touchend", () => paddle.dx = 0);

        btnRight.addEventListener("touchstart", (e) => {
            e.preventDefault();
            paddle.dx = paddle.speed;
        });
        btnRight.addEventListener("touchend", () => paddle.dx = 0);
    }
}