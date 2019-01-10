const Pattern = require('./Pattern');

module.exports = class ChargedOrb extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let orb = this.boss.chargedOrb;
		orb.x = this.boss.x + 1;
		orb.y = this.boss.y + 58;
		orb.chargeAndShoot();

		return function(){
			this.updateProjectiles();
			if (orb.shoot){
				this.update = defaultUpdate;
				this.patterns.finish();
			} else {
				orb.x = this.x + 1;
				orb.y = this.y + 58;
			}
		}
	}
}