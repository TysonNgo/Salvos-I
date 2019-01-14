const Missile = require('../projectiles/Missile');
const Orb = require('../projectiles/Orb');
const Radar = require('../projectiles/Radar');
const Teleport = require('../projectiles/Teleport');

// Patterns
const Teleport2Player = require('./Teleport');

// TODO
// movement patterns
const SlowMove = require('./SlowMove');
const FastMove = require('./FastMove');
const Retreat = require('./Retreat');
const SineMove = require('./SineMove');

// tackle patterns
const VTackle = require('./Pattern');
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
			new Teleport2Player(this.boss),
			new SlowMove(this.boss),
			new FastMove(this.boss),
			new Retreat(this.boss),
			new SineMove(this.boss),
			new RadarAttack(this.boss),
			new ChargedOrb(this.boss),
			new LinearRadialOrb(this.boss),
			new SpiralOrb(this.boss),
			new SlowMissile(this.boss),
			new TwinMissiles(this.boss),
			new USweep(this.boss),
			new TrackTackle(this.boss),
		];
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

	exec(){
		if (this.canExec){
			this.canExec = false;
			let rn = Math.floor(Math.random()*this.patterns.length);
			this.patterns[rn].exec();

			//console.log(this.patterns[rn].constructor.name)
		}
	}
}