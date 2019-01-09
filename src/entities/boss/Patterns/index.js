const Missile = require('../projectiles/Missile');
const Orb = require('../projectiles/Orb');
const Radar = require('../projectiles/RadarAttack');
const Teleport = require('../projectiles/Teleport');

// Patterns
const Teleport2Player = require('./Teleport');

// TODO
// movement patterns
const SlowMove = require('./Pattern');
const FastMove = require('./Pattern');
const SineMove = require('./Pattern');
const ResetPosition = require('./Pattern');

// tackle patterns
const VTackle = require('./Pattern');
const USweep = require('./Pattern');
const TrackTackle = require('./Pattern');

// projectile patterns
const SpiralOrb = require('./Pattern');
const ChargeOrb = require('./Pattern');
const RadarAttack = require('./Pattern');
const TripleMissile = require('./Pattern');
const TwinMissile = require('./Pattern');

module.exports = class Patterns {
	constructor(boss){
		this.boss = boss;
		this.patterns = [
			new Teleport2Player(this.boss)
		];
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

	}
}