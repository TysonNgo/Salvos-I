const Pattern = require('./Pattern');

module.exports = class LinearRadialOrb extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let i = 0;
		let orbClusters = 5;

		return function(){
			if (orbClusters <= 0){
				this.update = defaultUpdate;
				this.patterns.finish();
			}

			if (i % 15 === 0 && orbClusters > 0){
				console.log(this.orbs.availableProjectiles.length)
				let orbs = this.orbs.get(16);
				console.log(this.orbs.availableProjectiles.length)
				if (orbs){
					let angle = 2*Math.PI/orbs.length;
					let angleOffset = i % 2 === 0 ? angle/2 : 0;
					orbs.forEach((orb, i) => {
						let angle = 2*Math.PI/orbs.length*i + angleOffset;
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