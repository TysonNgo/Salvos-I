const Pattern = require('./Pattern');

module.exports = class Retreat extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		// retreats to the top of the screen
		let defaultUpdate = this._update;

		let x = this.boss.x;
		let y = this.boss.y;

		let backX = this.boss.random()*this.boss.scene.game.canvas.width;
		let backY = 65;

		let i = 1;
		let steps = 10;

		return function(){
			if (i >= 50){
				this.x = Math.round(backX);
				this.y = Math.round(backY);
				this.update = defaultUpdate;
				this.patterns.finish();
				return;
			}

			if (i % 5 === 0){
				this.x += (backX - x) * 2 ** -(i/5);
				this.y += (backY - y) * 2 ** -(i/5);
			}

			defaultUpdate.call(this);
			i++;
		}
	}
}