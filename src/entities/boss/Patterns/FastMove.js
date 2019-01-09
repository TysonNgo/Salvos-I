const Pattern = require('./Pattern');

module.exports = class FastMove extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		// shake for a moment, then quickly
		// move to a point within the upper
		// region of the screen
		let defaultUpdate = this._update;

		let move = false;
		let done = false;
		let x = this.boss.x;
		let y = this.boss.y;
		let i = 0;

		let minY = 65;
		let maxY = 385;
		let minX = 0;
		let maxX = this.boss.scene.game.canvas.width;

		let finX = this.boss.random()*(maxX-minX)+minX;
		let finY = this.boss.random()*(maxY-minY)+minY;

		let steps = 10;

		return function(){
			if (done){
				this.x = Math.round(this.x);
				this.y = Math.round(this.y);
				this.update = defaultUpdate;
				this.patterns.finish();
				return;
			}

			if (move){
				if (i >= steps){
					done = true;
				}
				this.x += (finX-x) / steps;
				this.y += (finY-y) / steps;
			} else {
				if (i % 4 === 0){
					this.x = x + Math.floor((this.random() > 0.5 ? 1 : -1) * this.random()*10);
					this.y = y + Math.floor((this.random() > 0.5 ? 1 : -1) * this.random()*10);
				}

				if ((i+1) % 40 === 0){
					this.x = x;
					this.y = y;
					move = true;
					i = 0;
				}
			}
			i++;
			defaultUpdate.call(this);
		}
	}
}