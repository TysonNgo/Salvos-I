const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(x, y, game, controller){
		super(x, y);
		this.game = game;
		this.controller = controller;
		this.sprite = this.game.add.sprite(this.x, this.y, 'player');

		this.createAnimations();
		this.listenKeystrokes();

		this.sprite.anims.play('player_idle');
	}

	createAnimations(){
		this.game.anims.create({
			key: 'player_idle',
			frames: this.game.anims.generateFrameNumbers('player', {start: 0, end: 4}),
			frameRate: 8,
			repeat: -1
		});
	}

	listenKeystrokes(){
		this.game.input.keyboard.on('keydown', e => {
			this.controller.press(e.key);
			if (e.key in this.controller.keys) console.log(this.controller.keys[e.key].button);
		})
		this.game.input.keyboard.on('keyup', e => {
			this.controller.release(e.key);
		})
	}

	update(){
		if (this.controller.pressingButton()){
			this.controller.pressingButton('left') ? this.x-=3: ''
			this.controller.pressingButton('up') ? this.y-=3: ''
			this.controller.pressingButton('down') ? this.y+=3: ''
			this.controller.pressingButton('right') ? this.x+=3: ''
		}
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}