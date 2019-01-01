const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(x, y, scene){
		super(x, y);
		this.scene = scene;
		this.sprite = this.scene.add.sprite(this.x, this.y, 'player');

		this.createAnimations();
		this.listenKeystrokes();

		this.sprite.anims.play('player_idle');
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'player_idle',
			frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 4}),
			frameRate: 8,
			repeat: -1
		});
	}

	listenKeystrokes(){
		this.scene.input.keyboard.on('keydown', e => {
			this.scene.game.controller.press(e.key);
			if (e.key in this.scene.game.controller.keys) console.log(this.scene.game.controller.keys[e.key].button);
		})
		this.scene.input.keyboard.on('keyup', e => {
			this.scene.game.controller.release(e.key);
		})
	}

	update(){
		if (this.scene.game.controller.pressingButton()){
			this.scene.game.controller.pressingButton('left') ? this.x-=3: ''
			this.scene.game.controller.pressingButton('up') ? this.y-=3: ''
			this.scene.game.controller.pressingButton('down') ? this.y+=3: ''
			this.scene.game.controller.pressingButton('right') ? this.x+=3: ''
		}
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}