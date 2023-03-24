class GameplayService{
    constructor(){
        this.canvas = null;
        this.bulletsManager = null;
        this.wavesManager = null;
        this.player = null;
        this.scrollingBackground = null;
        this.isDialog =false;
    }
    setCanvas(pCanvas){
        this.cancas = pCanvas;
    }
    setBulletManager(pBulletManager){
        this.bulletsManager = pBulletManager;
    }
    setWaveManager(pWaveManager){
        this.wavesManager = pWaveManager;
    }
    setPlayer(pPlayer){
        this.player = pPlayer;
    }
    setScrollingBackround(pScrollingBackground){
        this.scrollingBackground = pScrollingBackground;
    }
  }


class SceneJeu {
    constructor() {
        this.keyboard = null;
        this.imageLoader = null;
        this.imgBackground = null;

        this.gameplayService = new GameplayService();
        this.bulletsManager = new bulletsManager();
        this.wavesManager = new WavesManager(this.gameplayService);

        this.gameplayService.setCanvas(canvas);
        this.gameplayService.setWaveManager(this.wavesManager);
        this.gameplayService.setBulletManager(this.bulletsManager);

        this.shotSpeed = 0.2;
        this.shotTimer = 0;

       this.lstBullets = [];
       this.lstEmitters = [];

        this.sndExplosion = new sound("sounds/explosion.wav");
        this.sndLaser = new sound("sounds/laserShoot0.wav");
       
    }

    load(pImageLoader) {
        this.imageLoader = pImageLoader;
        this.imgBackground = this.imageLoader.getImage("images/background.png");
        this.background = new ScrollingBackground(this.imgBackground);
        this.background.speed = 1.5;

        this.player = new Player(5, 100);
        

        let imgEnemyBall = this.imageLoader.getImage("images/enemyball.png");
        let spriteEnemyBall = new Sprite(imgEnemyBall);
        spriteEnemyBall.setTileSheet(17, 14);
        spriteEnemyBall.addAnimation("IDLE", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0.1, true);
        spriteEnemyBall.startAnimation("IDLE");

        this.wavesManager.addWave(new AlienWave(spriteEnemyBall, 5, 0.5, 320 + 250, 320, 50));
        this.wavesManager.addWave(new AlienWave(spriteEnemyBall, 10, 0.5, 320 + 1000, 320, 150));

        /*
        this.ParticleEmitter = new ParticleEmitter(320 / 2, 200 / 2);
        for (let n = 0; n < 500; n++) {
            this.ParticleEmitter.add();
        }
        */
    }

    update(dt) {
        this.background.update(dt);
        this.wavesManager.update(dt, this.background.distance);
        //this.ParticleEmitter.update(dt);

        for (let index = this.lstBullets.length - 1; index >= 0; index--) {
            const b = this.lstBullets[index];
            b.update(dt);
            if (b.outOfScreen(canvas.width, canvas.height)) {
                this.lstBullets.splice(index, 1);
                console.log("Suppression d'un projectile hors écran");
            } else {
                let lstAliens = this.wavesManager.currentWave.alienList;
                var score = 0;
                for (let indexAlien = lstAliens.length - 1; indexAlien >= 0; indexAlien--) {
                    const a = lstAliens[indexAlien].sprite;
                    if (b.collideWith(a)) {
                        score ++;
                        
                        this.lstBullets.splice(index, 1);
                        lstAliens.splice(indexAlien, 1);
                        let newExplosion = new ParticleEmitter(a.x + a.width / 2, a.y + a.height / 2);
                        for (let n = 0; n < 20; n++) {
                            newExplosion.add();
                        }
                        this.lstEmitters.push(newExplosion);
                        this.sndExplosion.stop();
                        this.sndExplosion.play();
                    }
                }
            }
        }

        console.log(this.keyboard["ArrowDown"]);

        if (this.keyboard["ArrowDown"] == true) {
            this.player.y += 1;
        }
        if (this.keyboard["ArrowUp"] == true && this.player.y > 1) {
            this.player.y -= 1;
        }
        if (this.keyboard["ArrowRight"] == true) {
            this.player.x += 1;
        }
        if (this.keyboard["ArrowLeft"] == true && this.player.x > 1) {
            this.player.x -= 1;
        }

        if (this.keyboard["Space"] == true) {
            this.player.showCanon = true;
            if (this.shotTimer <= 0) {
                this.Shoot();
                this.shotTimer = this.shotSpeed;
            }
        }
        else {
            this.player.showCanon = false;
        }

        if (this.shotTimer > 0) {
            this.shotTimer -= dt;
        }

        this.player.update(dt);

        this.lstEmitters.forEach(emitter => {
            emitter.update(dt);
        });
    }
    
    draw(pCtx) {
        pCtx.save();
        pCtx.scale(2, 2);

        //dessine le fond qui scrolle
        this.background.draw(pCtx);
        this.wavesManager.draw(pCtx);
        this.bulletsManager.draw(pCtx);
        this.player.draw(pCtx);

        this.lstBullets.forEach(b => {
            b.draw(pCtx);
        });
        drawScore(); 
            
        //this.ParticleEmitter.draw(pCtx);

        this.lstEmitters.forEach(emitter => {
            emitter.draw(pCtx);
        });

        pCtx.restore();
    }

    Shoot() {
        let position = this.player.getShotPosition(14);
        let b = new Bullet(position.x, position.y, 2, 0, "PLAYER");
        this.lstBullets.push(b);
        this.sndlaser.stop();
        this.sndLaser.play();
    }

    keypressed(pKey) {
        if (pKey == "Space") {
        }
    }
}