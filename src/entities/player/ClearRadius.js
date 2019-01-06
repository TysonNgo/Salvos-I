const Entity = require('../Entity');

module.exports = class ClearRadius extends Entity{
	constructor(player){
		super(player.x, player.y, 100);
		this.player = player;
		this.player.scene.addObject('player_special', this);
	}

	update(){

	}
}