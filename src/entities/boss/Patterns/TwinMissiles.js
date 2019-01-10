const Pattern = require('./Pattern');

module.exports = class TwinMissiles extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let missiles = this.boss.twinMissiles.get(2);
		let m1, m2;
		if (missiles){
			missiles.forEach(m => {
				m.active = true;
			})

			m1 = missiles[0];
			m2 = missiles[1];
		}

		let i = 0;

		return function(){
			if (i >= 60){
				if (m1 && m2){
					m1.fired = true;
					m2.fired = true;
				}
				this.update = defaultUpdate;
				this.patterns.finish();
			}
			this.updateProjectiles();
			i++;
		}
	}
}