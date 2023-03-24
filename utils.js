// https://www.w3schools.com/graphics/game_sound.asp
function sound(src, vol = 1) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = vol;
    this.sound
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.currentTime = 0;
        this.stop();
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function DrawCircle(pCtx, px, py, pr) {
    pCtx.beginPath();
    pCtx.strokeStyle = "white";
    pCtx.arc(px, py, pr, 0, 2 * Math.PI);
    pCtx.fillStype = "white";
    pCtx.fill();
    pCtx.stroke();
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 250, 20);
}

function CheckCollision(o1, o2) {
    if (o1.x < o2.x + o2.width &&
        o1.x + o1.width > o2.x &&
        o1.y < o2.y + o2.height &&
        o1.height + o1.y > o2.y) {
        score ++;
        return true;
        }
    else return false;
}
//function Compteur