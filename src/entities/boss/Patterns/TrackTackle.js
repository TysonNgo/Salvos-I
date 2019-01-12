const Pattern = require('./Pattern');

module.exports = class TrackTackle extends Pattern {
	constructor(boss){
		super(boss);
		this._hit = boss.hit;
		this.graphics = boss.scene.add.graphics({
			lineStyle: {color: 0x555555, width: 5}
		});
		this.graphics.depth = -5;
	}

	update(){
		let defaultUpdate = this._update;
		let defaultHit = this._hit;
		let hits = 0;
		let graphics = this.graphics;
		let player = this.boss.scene.objects.player;

		if (!player){
			this.boss.patterns.finish();
			return defaultUpdate;
		}
		player = player[0];

		this.boss.hit = function(){
			defaultHit.call(this);
			hits++;
		}

		let tackle = false;
		let done = false;

		let i = 0;
		let travelled = 0;
		let speed = 20;

		let initX = this.boss.x;
		let initY = this.boss.y;

		let vX, vY;
		let x1, x2, y1, y2;
		let m, d;

		return function(){
			graphics.clear();
			if (done){
				this.hit = defaultHit;
				this.update = defaultUpdate;
				this.patterns.finish();
				this.sprite.tint = undefined;
				return;
			}
			if (i > 120){
				tackle = true;
			}

			let hex = parseInt(((i % 16)+'').repeat(6), 16);
			this.sprite.tint = hex;

			if (tackle){
				let finX = initX+m*vX;
				let finY = initY+m*vY;

				travelled += speed;
				m = ((speed**2)/((vX)**2 + (vY)**2)) ** 0.5;

				this.x += m*vX;
				this.y += m*vY;

				if (travelled >= d){
					done = true;
				}
			} else {
				x1 = this.x+2;
				y1 = this.y+55;

				vX = player.x - x1;
				vY = player.y - y1;

				m = Math.max(1-hits/15, 0.25);

				x2 = x1+m*vX;
				y2 = y1+m*vY;
			
				vX = player.x - initX;
				vY = player.y - initY;

				d = ((m*vX)**2 + (m*vY)**2) ** 0.5;

				graphics.beginPath();
				graphics.moveTo(x1, y1);
				graphics.lineTo(x2, y2);
				graphics.closePath();
				graphics.strokePath();
			}

			defaultUpdate.call(this);
			i++;
		}
	}
}