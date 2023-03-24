class ScrollingBackground {
    constructor(pImg) {
        this.speed = 0;
        this.x = 0;
        this.image = pImg;
        this.distance = pImg.width;
    }

    update(dt) {
        this.x -= this.speed;
        this.distance += this.speed;
        if (this.x <= 0 - this.image.width) {
            this.x = 0;
        }
    }

    draw(pCtx) {
        pCtx.drawImage(this.image, this.x, 0);
        pCtx.drawImage(this.image, this.x + this.image.width, 0);
    }
}