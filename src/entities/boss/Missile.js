const Entity = require('../Entity');

module.exports = class Missile extends Entity{
	constructor(boss){
		super(boss.x, boss.y, 11, 55);
		this.boss = boss;
		this.boss.scene.addObject('boss_missile', this);

		this.sprite = this.boss.scene.add.sprite(this.x, this.y, 'boss_missile');
	}

	static loadAssets(scene){
		scene.load.image('boss_missile', 'assets/game/boss/missile.png');
	}

	destroy(){
		this.active = false;
	}

	update(){
		this.x = this.boss.x;
		this.y = this.boss.y+140;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.active;
	}
}