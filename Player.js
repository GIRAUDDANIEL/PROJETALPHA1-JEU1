class Player {
    constructor(pX, pY) {
        let imgShip = imageLoader.getImage("images/player.png");
        this.sprShip = new Sprite(imgShip, pX, pY);
        this.sprShip.setTileSheet(30, 16);
        this.sprShip.currentFrame = 9;

        let imgCanon = imageLoader.getImage("images/ShotTiny.png");
        this.sprCanon = new Sprite(imgCanon, pX, pY);
        this.sprCanon.setTileSheet(18, 14);
        this.sprCanon.addAnimation("idle", [0, 1], 0.2, true);
        this.sprCanon.startAnimation("idle");
        this.x = this.sprShip.x;
        this.y = this.sprShip.y;

        this.showCanon = false;
    }

    getShotPosition(pBulletHeight) {
        let position = { x: 0, y: 0 };
        let midShip = this.y + (this.sprShip.tileSize.y / 2);
        position.x = this.x + (this.sprShip.tileSize.x) - 6;
        position.y = midShip - (pBulletHeight / 2) + 3;
        return position
    }

    update(dt) {
        this.sprShip.update(dt);
        this.sprCanon.update(dt);
        this.sprShip.x = this.x;
        this.sprShip.y = this.y;
        let position = this.getShotPosition(16);
        this.sprCanon.x = position.x + 2;
        this.sprCanon.y = position.y;
    }

    draw(pCtx) {
        this.sprShip.draw(pCtx);
        if (this.showCanon)
            this.sprCanon.draw(pCtx);
    }
}