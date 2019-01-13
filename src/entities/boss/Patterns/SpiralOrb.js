const Pattern = require('./Pattern');

module.exports = class SpiralOrb extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let i = 0;
		let orbClusters = 10;

		return function(){
			if (orbClusters <= 0){
				this.update = defaultUpdate;
				this.patterns.finish();
			}

			if (i % 15 === 0 && orbClusters > 0){
				let orbs = this.spiralOrbs.get(16);
				if (orbs){
					this.orbSFX.play();
					orbs.forEach((orb, i) => {
						let angle = 2*Math.PI/orbs.length*i;
						orb.angle = angle;
						orb.fire();
					})
				}
				orbClusters--;
			}

			this.updateProjectiles();
			i++;
		}
	}
}