const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(x, y, scene){
		super(x, y);
		this.scene = scene;
		this.sprite = this.scene.add.sprite(this.x, this.y, 'boss')
		this.createAnimations();
		this.sprite.anims.play('boss_idle');
		//this.scene.add.sprite(this.x, this.y+100, 'boss_missile')
	}

	static loadAssets(scene){
		scene.load.image('boss_missile', 'assets/game/boss/missile.png');
		scene.load.spritesheet('boss', 'assets/game/boss/idle.png', {frameWidth: 214, frameHeight: 191});
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'boss_idle',
			frames: this.scene.anims.generateFrameNumbers('boss', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
	}
	
	removeAnimations(){
		this.scene.anims.remove('boss_idle');
	}

	update(){
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}