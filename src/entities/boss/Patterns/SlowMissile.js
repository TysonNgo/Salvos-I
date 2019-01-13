const Pattern = require('./Pattern');

module.exports = class SlowMissile extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let missile = this.boss.slowMissile.get();
		if (missile){
			this.boss.missileSFX.play();
			missile.active = true;
			missile.fired = true;
			missile.x = this.boss.x;
			missile.y = this.boss.y;
			missile.speed = 4;
		}

		let i = 0;

		return function(){
			defaultUpdate.call(this);
			if (i >= 30){
				this.update = defaultUpdate;
				this.patterns.finish();
				return;
			}
			i++;
		}
	}
}