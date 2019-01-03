const Entity = require('./Entity');
const Meter = require('./Meter');

module.exports = class extends Entity{
	constructor(x, y, scene){
		super(x, y);
		this.scene = scene;
		this.sprite = this.scene.add.sprite(this.x, this.y, 'player');

		this.createAnimations();
		this.listenKeystrokes();

		this.sprite.anims.play('player_idle');

		this.meter = new Meter(0, this.scene);
	}

	static loadAssets(scene){
		scene.load.spritesheet('player', 'assets/game/player/idle.png', {frameWidth: 50, frameHeight: 50});
		Meter.loadAssets(scene);
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
			this.scene.game.controller.press(e.code);
		})
		this.scene.input.keyboard.on('keyup', e => {
			this.scene.game.controller.release(e.code);
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

		this.meter.update();
	}
}