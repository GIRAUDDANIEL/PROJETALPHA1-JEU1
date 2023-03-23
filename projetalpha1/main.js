

var canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let interval;
let fps = 0;

var score = 0;

let derniereUpdate = 0;

function showFPS() {
    ctx.fillStyle = "White";
    ctx.font = "normal 16pt Arial";

    ctx.fillText(Math.floor(fps) + " fps", 10, 20);
}

function run(time) {
    requestAnimationFrame(run);
    let dt = (time - derniereUpdate) / 1000;

    if (dt < (1 / 60) - 0.001) {
        return;
    }

    fps = 1 / dt;
    derniereUpdate = time;
    update(dt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
    showFPS();
}

function init() {
    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
   
    load();
    //interval = setInterval(run, 1000 / 60); 
        requestAnimationFrame(run);
}

init();
