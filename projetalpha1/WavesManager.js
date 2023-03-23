class Alien {
    constructor(pSprite, pGameplayService) {
        this.sprite = pSprite;
        this.gameplayService = pGameplayService;
        this.timer = 0;
        this.pendingDelay = 0;
        this.speed = 1;
        this.started = false;
        this.fireTimer = rnd(3,8);
    }

    update(dt) {
        this.sprite.update(dt);
        this.fireTimer -=dt;
    }
    fire()
    {
        if (this.fireTimer <=0){
            this.gameplayService.bulletsManager.shoot(this.sprite.x, this.sprite.y, Math.random()+ (2 * Math.PI),1,"ALIEN");
            this.fireTimer = rnd(3,8);
        }
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }
}

class AlienWave {
    constructor(pSprite, pNumber, pPendingDelay, pStartDistance, pX, pY) {
        this.alienList = [];
        this.sprite = pSprite;
        this.startDistance = pStartDistance;
        this.started = false;
        this.number = pNumber;
        this.pendingDelay = pPendingDelay;
        this.x = pX;
        this.y = pY;
    }

    addAlien(pAlien) {
        this.alienList.push(pAlien);
    }

    update(dt) {
        for (let i = this.alienList.length - 1; i >= 0; i--) {
            let alien = this.alienList[i];
            /*console.log("total"+this.alienList.length);*/

            if (alien.started == false) {
                alien.timer += dt;
                if (alien.timer >= alien.pendingDelay) {
                 //   console.log("alien qui démarre à " + alien.timer);
                    alien.started = true;
                }
            }

            if (alien.started) {
                alien.update(dt);
                alien.sprite.x -= alien.speed;
                if (alien.sprite.x < 0 - alien.sprite.tileSize.x) {
                 //   console.log("suppresion d'un alien hors écran");
                    this.alienList.splice(i, 1);
                }
            }
        }
    }

    draw(pCtx) {
        this.alienList.forEach(alien => {
            alien.draw(pCtx);
        });
    }
}

class WavesManager {
    constructor(pGameplayService) {
        this.gameplayService = pGameplayService;
        this.wavesList = [];
        this.currentWave = null;
    }

    addWave(pWave) {
        this.wavesList.push(pWave);
    }

    stopWave(pWave) {
     //   console.log("Stoppe la vague précédente");
        let index = this.wavesList.indexOf(pWave);
        if (index != -1) {
            this.wavesList.splice(index, 1);
        }
    }

    startWave(pWave) {
      //  console.log("Vague démarrée à " + pWave.startDistance);
        pWave.started = true;

        if (this.currentWave != null) {
            this.stopWave(pWave);
        }

        this.currentWave = pWave;

        for (let i = 0; i < pWave.number; i++) {
            console.log("Crée alien " + i);

            let mySprite = new Sprite(pWave.sprite.img);
            Object.assign(mySprite, pWave.sprite);

            let alien = new Alien(mySprite, this.gameplayService);
            alien.sprite.x = pWave.x;
            alien.sprite.y = pWave.y;
            alien.pendingDelay = i * pWave.pendingDelay;
            pWave.addAlien(alien);
        }
    }

    update(dt, pDistance) {
        this.wavesList.forEach(wave => {
            if (pDistance >= wave.startDistance && !wave.started) {
                this.startWave(wave);
            }
        });
        if (this.currentWave != null) {
            this.currentWave.update(dt, this.gameplayService.bulletsManager);
        }
    }

    draw(pCtx) {
        if (this.currentWave != null) {
            this.currentWave.draw(pCtx);
        }
    }
}