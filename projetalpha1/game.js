let imageLoader = new ImageLoader();
let gameReady = false;

let sceneJeu = new SceneJeu();

let keyboard = [];

function toucheEnfoncee(t) {
    t.preventDefault();
    if (keyboard[t.code] == false || keyboard[t.code] == null) {
        sceneJeu.keypressed(t.code);
    }
    keyboard[t.code] = true;
}

function toucheRelachee(t) {
    t.preventDefault();
    keyboard[t.code] = false;
}

function load() {
    document.addEventListener("keydown", toucheEnfoncee, false);
    document.addEventListener("keyup", toucheRelachee, false);

    imageLoader.add("images/background.png");
    imageLoader.add("images/enemyball.png");
    imageLoader.add("images/ShotTiny.png");
    imageLoader.add("images/ShotBasic.png");
    imageLoader.add("images/player.png");

    imageLoader.start(startGame);
}

function startGame() {
    console.log("StartGame");

    lstSprites = [];

    sceneJeu.load(imageLoader);

    gameReady = true;
}

function update(dt) {
    if (!gameReady) {
        return;
    }
    // Suite quand le jeu est prêt
    sceneJeu.keyboard = keyboard;
    sceneJeu.update(dt);
}

function draw(pCtx) {
    if (!gameReady) {
        let ratio = imageLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 400, 100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1, 1, 400 * ratio, 100);
        return;
    }

    sceneJeu.draw(pCtx);
}