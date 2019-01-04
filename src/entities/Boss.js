const Entity = require('./Entity');

module.exports = class Boss extends Entity{
	constructor(x, y, scene){
		super(x, y);
		this.scene = scene;
		this.createAnimations();

		this.sprite = this.scene.add.sprite(this.x, this.y, 'boss')
		this.spriteJetfire = this.scene.add.sprite(this.x, this.y, 'boss_jetfire')
		this.spriteJetfire.anims.play('boss_jetfire_animation');

		//this.scene.add.sprite(this.x, this.y+140, 'boss_missile')
	}

	static loadAssets(scene){
		scene.load.image('boss_missile', 'assets/game/boss/missile.png');
		scene.load.image('boss', 'assets/game/boss/idle.png');
		scene.load.spritesheet('boss_jetfire', 'assets/game/boss/jetfire.png', {frameWidth: 214, frameHeight: 191});
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'boss_jetfire_animation',
			frames: this.scene.anims.generateFrameNumbers('boss_jetfire', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
	}

	removeAnimations(){
		this.scene.anims.remove('boss_jetfire_animation');
	}

	update(){
		this.spriteJetfire.x = this.x;
		this.sprite.y = this.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}