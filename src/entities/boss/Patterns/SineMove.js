const Pattern = require('./Pattern');

module.exports = class SineMove extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		// move in a wave towards the opposite
		// side of the screen
		let defaultUpdate = this._update;

		let gameWidth = this.boss.scene.game.canvas.width;
		let left = this.boss.x < gameWidth/2;

		let x = this.boss.x;
		let y = this.boss.y;

		let finX = (gameWidth*left) + (((-1) ** left) * (this.boss.width/2));

		let d = Math.abs(finX-x)/2;
		let i = 0;

		return function(){
			this.x = x + (-1) ** !left * i*2;
			this.y = y + 30*Math.sin(i/8);

			if (i >= d){
				this.x = Math.round(this.x);
				this.y = Math.round(this.y);
				this.update = defaultUpdate;
				return;
			}

			defaultUpdate.call(this);
			i++;
		}
	}
}