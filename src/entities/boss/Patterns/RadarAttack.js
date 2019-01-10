const Pattern = require('./Pattern');
const Radar = require('../projectiles/Radar');

module.exports = class RadarAttack extends Pattern {
	constructor(boss){
		super(boss);
		self.radar = new Radar(boss);
	}

	update(){
		let pattern = this;
		let defaultUpdate = this.boss.update;
		let radar = self.radar;
		radar.start = true;
		radar.x = radar.boss.x;
		radar.y = radar.boss.y;

		let execNext = true;

		return function(){
			if (execNext){
				execNext = false;
				this.patterns.finish();
			}
			if (radar.update()){
				pattern.finish();
				this.update = defaultUpdate;
				return
			}
			defaultUpdate.call(this);
		}
	}
}