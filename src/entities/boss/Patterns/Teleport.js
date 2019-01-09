const Teleport = require('../projectiles/Teleport');

module.exports = class Pattern {
	constructor(boss){
		this.boss = boss;
		this.teleport = new Teleport(boss);
	}

	exec(){}
}