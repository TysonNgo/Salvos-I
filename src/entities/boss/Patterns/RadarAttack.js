const Pattern = require('./Pattern');
const Radar = require('../projectiles/Radar');

module.exports = class RadarAttack extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;
		if (!this.boss.radars[0].start){
			this.boss.radars[0].start = true;
			this.boss.radars[0].x = this.boss.x;
			this.boss.radars[0].y = this.boss.y;
		}

		return function(){
			this.update = defaultUpdate;
			this.patterns.finish();
			
		}
	}
}