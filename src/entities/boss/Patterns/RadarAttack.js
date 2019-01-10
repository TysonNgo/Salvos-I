const Pattern = require('./Pattern');
const Radar = require('../projectiles/Radar');

module.exports = class RadarAttack extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;
		let radar = this.boss.radars.get();
		if (radar && !radar.start){
			radar.start = true;
			radar.x = this.boss.x;
			radar.y = this.boss.y;
		}

		let i = 0;

		return function(){
			if (i >= 30){
				this.update = defaultUpdate;
				this.patterns.finish();
			}
			defaultUpdate.call(this);
			i++;
		}
	}
}