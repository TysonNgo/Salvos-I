const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(x, y, game){
		super(x, y);
		this.game = game;
		this.sprite = this.game.add.sprite(this.x, this.y, 'boss')
		this.createAnimations();
		this.sprite.anims.play('boss_idle');
		this.game.add.sprite(this.x, this.y+100, 'boss_missile')
	}

	createAnimations(){
		this.game.anims.create({
			key: 'boss_idle',
			frames: this.game.anims.generateFrameNumbers('boss', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
	}

	update(){
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}