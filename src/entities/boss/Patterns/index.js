const Missile = require('../projectiles/Missile');
const Orb = require('../projectiles/Orb');
const Radar = require('../projectiles/Radar');
const Teleport = require('../projectiles/Teleport');

// Patterns
// movement patterns
const Teleport2Player = require('./Teleport');
const SlowMove = require('./SlowMove');
const FastMove = require('./FastMove');
const Retreat = require('./Retreat');
const SineMove = require('./SineMove');

// tackle patterns
const USweep = require('./USweep');
const TrackTackle = require('./TrackTackle');

// projectile patterns
const LinearRadialOrb = require('./LinearRadialOrb');
const SpiralOrb = require('./SpiralOrb');
const ChargedOrb = require('./ChargedOrb');
const RadarAttack = require('./RadarAttack');
const SlowMissile = require('./SlowMissile');
const TwinMissiles = require('./TwinMissiles');

module.exports = class Patterns {
	constructor(boss){
		this.boss = boss;
		this.canExec = true;
		this.patterns = [
			new SlowMove(this.boss),
			new SineMove(this.boss),
			new FastMove(this.boss),
			new ChargedOrb(this.boss),
			new Teleport2Player(this.boss),
			new LinearRadialOrb(this.boss),
			new SpiralOrb(this.boss),
			new TwinMissiles(this.boss),
			new USweep(this.boss),
			new TrackTackle(this.boss),
			new Retreat(this.boss),
			new SlowMissile(this.boss),
			new RadarAttack(this.boss),
		];
		// probabilities
		this.p = Array(this.patterns.length).fill(1/this.patterns.length);	

		this.n30s = 0;
	}

	finish(){
		this.canExec = true;
	}

	static loadAssets(scene){
		Missile.loadAssets(scene);
		Orb.loadAssets(scene);
		Teleport.loadAssets(scene);
	}

	static createAnimations(scene){
		Missile.createAnimations(scene);
		Orb.createAnimations(scene);
		Teleport.createAnimations(scene);
	}

	static removeAnimations(scene){
		Missile.removeAnimations(scene);
		Orb.removeAnimations(scene);
		Teleport.removeAnimations(scene);
	}

	adjustProbabilities(){
		let n30s = Math.floor((this.boss.scene.timer.frames/this.boss.scene.game.loop.targetFps) / 30);
		if (n30s > this.n30s){
			// adjust the probabilities
			this.p.forEach((p, i)=>{
				switch(this.patterns[i].constructor.name){
					case SlowMove.name:
					case SineMove.name:
						if (p > 0.01){
							this.increaseProbability(i, -0.1, RadarAttack.name);
						}
						break;
					case FastMove.name:
						if (p < 1/12){
							this.increaseProbability(i, 0.05)
						}
						break;
					case ChargedOrb.name:
						if (p > 0.02){
							this.increaseProbability(i, -0.05)
						}
						break;
					case Teleport2Player.name:
						if (p < 1/6){
							this.increaseProbability(i, 0.1);
						}
						break;
					case LinearRadialOrb.name:
					case SpiralOrb.name:
						if (p > 0.05){
							this.increaseProbability(i, -0.01)
						}
						break;
					case TwinMissiles.name:
						break;
					case USweep.name:
						break;
					case TrackTackle.name:
						break;
					case Retreat.name:
						break;
					case SlowMissile.name:
						if (p < 1/4){
							this.increaseProbability(i, 0.1);
						}
						break;
					case RadarAttack.name:
						if (p < 1/4){
							this.increaseProbability(i, 0.1);
						}
						break;
				}
			})

			this.n30s = n30s;
		}
	}

	increaseProbability(i, m, distribute='all'){
		let amount = this.p[i]*m;
		this.p[i] += amount;
		this.patterns.forEach((p, index) => {
			if (distribute === 'all'){
				let a = amount/this.p.length;
				if (p.constructor.name !== this.p[i].constructor.name){
					this.p[index] -= a;
					if (this.p[index] < 0){
						this.p[i] += Math.abs(this.p[index]);
						this.p[index] = 0;
					}
				}
			} else if (p.constructor.name === distribute){
				this.p[index] -= amount;
			}
		})
	}

	_getRandomIndex(){
		let random = this.boss.random();
		let index = this.patterns.length-1;
		let p = 0;

		this.p.some((prob, i) => {
			if (random < prob){
				index = i;
				return true;
			}
			random -= prob;
		})

		return index;
	}

	exec(){
		this.adjustProbabilities();
		if (this.canExec){
			this.canExec = false;
			let rn = this._getRandomIndex();

			this.patterns[rn].exec();
		}
	}
}