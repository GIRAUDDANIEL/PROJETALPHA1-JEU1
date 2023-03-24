class Bullet extends Sprite {
    constructor(px, py, pVx, pVy, pType) {
        let img;
        switch (pType) {
            case "PLAYER":
                img = imageLoader.getImage("images/ShotTiny.png");
                super(img, px, py);
                this.setTileSheet(18, 14);
                this.currentFrame = 2;
                this.friendly = true;
                break;

            case "ALIEN":
                img = imageLoader.getImage("images/ShotBasic.png");
                super(img, px, py);
                this.setTileSheet(9, 8);
                this.addAnimation("idle", [0, 1, 2, 3], .1, true);
                this.startAnimation("idle");

                this.friendly = false;
                break;

            case "BOSS":
                this.friendly = false;
                break;

            default:
                console.error("Bullet:constructor => Erreur pas de type de Bullet");
                break;
        }
        // Le type
        this.type = pType;
        // Le mouvement
        this.vx = pVx;
        this.vy = pVy;
    }

    outOfScreen(pWidth, pHeight) {
        if (this.x + this.tileSize.x < 0 || this.y + this.tileSize.y < 0 || this.x > pWidth || this.y > pHeight) {
            return true;
        }
        else { return false };
    }

    update(dt) {
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
    }
}
class bulletsManager {
    constructor() {
        this.lstBullets = [];
    }

    clear() {
        this.lstBullets = [];
    }

    shoot(px, py, pAngle, pSpeed, pType) {
        console.log("angle " + pAngle.toString());
        let vx, vy;
        vx = pSpeed * Math.cos(pAngle);
        vy = pSpeed * Math.sin(pAngle);
        let b = new Bullet(px, py, vx, vy, pType);
        this.lstBullets.push(b);
    }

    update(dt) {
        for (let index = this.lstBullets.length - 1; index >= 0; index--) {
            let b = this.lstBullets[index];
            b.update(dt);
            if (b.outOfScreen(canvas.width, canvas.height)) {
                this.lstBullets.splice(index, 1);
                console.log("Remove bullet out of screen, reste " + this.lstBullets.length.toString());
            }
        }
    }

    draw(pCtx) {
        this.lstBullets.forEach(b => {
            b.draw(pCtx);
        });
    }
}