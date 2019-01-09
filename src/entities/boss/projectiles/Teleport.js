const Entity = require('../../Entity');

module.exports = class Teleport extends Entity{
	constructor(boss){
		super(boss.x, boss.y);
		this.boss = boss;

		this.active = false;

		this.sprite = this.boss.scene.add.sprite(this.x, this.y, 'boss_teleport');
		this.sprite.visible = this.active;

		this.SFX = this.boss.scene.sound.add('bossTeleport');
	}

	static loadAssets(scene){
		scene.load.spritesheet('boss_teleport', 'assets/game/boss/teleport.png', {frameWidth: 214, frameHeight: 191});
		scene.load.audio('bossTeleport', ['assets/audio/bossTeleport.mp3', 'assets/audio/bossTeleport.ogg']);
	}

	static createAnimations(scene){
		scene.anims.create({
			key: 'boss_teleport_animation',
			frames: scene.anims.generateFrameNumbers('boss_teleport', {start: 0, end: 2}),
			frameRate: 8,
		});
	}

	static removeAnimations(scene){
		scene.anims.remove('boss_teleport_animation');
	}

	update(){
		this.sprite.visible = this.active;
		this.x = this.boss.x;
		this.y = this.boss.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}