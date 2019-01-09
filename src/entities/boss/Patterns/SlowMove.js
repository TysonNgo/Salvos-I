const Pattern = require('./Pattern');

module.exports = class SlowMove extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		// move to a point within some radius
		let defaultUpdate = this._update;
		let rad = this.boss.random()*2*Math.PI;
		let radius = Math.floor(this.boss.random()*75+50);
		let x = Math.cos(rad)*radius;
		let y = Math.sin(rad)*radius;
		let d = 1;
		let dunit = d;
		let m = ((d**2)/(x**2 + y**2)) ** 0.5

		x *= m;
		y *= m;

		return function(){
			if (d > radius){
				this.x = Math.round(this.x);
				this.y = Math.round(this.y);
				this.update = defaultUpdate;
				this.patterns.finish();
				return;
			}
			this.x += x;
			this.y += y;
			defaultUpdate.call(this);
			d += dunit;
		}
	}
}