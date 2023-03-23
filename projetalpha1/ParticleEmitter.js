class Particle {
    constructor(px, py) {
        this.x = px;
        this.y = py;
        this.life = rnd(500, 1000) / 1000;
        this.lifeMax = this.life;
        var angle = Math.random() * (2 * Math.PI);
        this.vx = (rnd(10, 200) / 100) * Math.cos(angle);
        angle = Math.PI + (Math.random() * Math.PI);
        this.vy = (rnd(30, 500) / 100) * Math.sin(angle);
        this.radius = rnd(1, 5);
        this.alpha = Math.random();
    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.vy += 0.1;
        this.life -= dt;
    }

    draw(pCtx) {
        var coef = this.life / this.lifeMax;
        pCtx.globalAlpha = this.alpha * coef;
        DrawCircle(pCtx, this.x, this.y, this.radius);
        pCtx.globalAlpha = 1;
    }
}

class ParticleEmitter {
    constructor(px, py) {
        this.lstParticles = [];
        this.x = px;
        this.y = py;
    }

    add() {
        var p = new Particle(this.x + rnd(-5, 5), this.y + rnd(-5, 5));
        this.lstParticles.push(p);
    }

    update(dt) {
        for (var index = this.lstParticles.length - 1; index >= 0; index--) {
            var p = this.lstParticles[index];
            p.update(dt);
            if (p.life <= 0) {
                this.lstParticles.splice(index, 1);
            }
        }
    }

    draw(pCtx) {
        this.lstParticles.forEach(p => {
            p.draw(pCtx);
        });
    }
}
