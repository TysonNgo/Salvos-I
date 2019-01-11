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
				m.x = this.boss.x;
				m.y = this.boss.y;
			})

			m1 = missiles[0];
			m2 = missiles[1];
		}

		let i = 0;

		return function(){
			defaultUpdate.call(this);
			if (i >= 30 || !missiles){
				this.update = defaultUpdate;
				this.patterns.finish();
				return;
			}else if (i >= 25){
				m1.fired = true;
				m2.fired = true;
				m1.speed = m2.speed;
			} else{
				m1.x -= 2;
				m1.y -= 2;
				m2.x += 2;
				m2.y = m1.y;
			}
			i++;
		}
	}
}