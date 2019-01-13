const Pattern = require('./Pattern');

module.exports = class ChargedOrb extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let orb = this.boss.chargedOrb.get();
		if (orb && !orb.shoot){
			orb.x = this.boss.x + 1;
			orb.y = this.boss.y + 58;
			this.boss.chargeSFX.play({delay: 0.1});
			orb.chargeAndShoot();
		}

		if (orb && orb.y >= this.boss.scene.game.canvas.height){
			this.boss.patterns.finish();
			return defaultUpdate;
		}

		return function(){
			this.updateProjectiles();
			if (!orb || orb.shoot){
				this.update = defaultUpdate;
				this.patterns.finish();
			} else {
				orb.x = this.x + 1;
				orb.y = this.y + 58;
			}
		}
	}
}