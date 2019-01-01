const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(x, y, scene){
		super(x, y);
		this.scene = scene;
		this.sprite = this.scene.add.sprite(this.x, this.y, 'boss')
		this.createAnimations();
		this.sprite.anims.play('boss_idle');
		this.scene.add.sprite(this.x, this.y+100, 'boss_missile')
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'boss_idle',
			frames: this.scene.anims.generateFrameNumbers('boss', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
	}

	update(){
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}