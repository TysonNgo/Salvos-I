const Entity = require('./Entity');
const Meter = require('./Meter');
const BulletContainer = require('./BulletContainer');

module.exports = class Player extends Entity{
	constructor(x, y, scene){
		super(x, y);
		this.scene = scene;
		this.sprite = this.scene.add.sprite(this.x, this.y, 'player');

		this.createAnimations();
		this.listenKeystrokes();

		this.sprite.anims.play('player_idle');

		this.meter = new Meter(0, this.scene);

		this.shootSFX = this.scene.sound.add('playerShoot');
		this.shieldSFX = this.scene.sound.add('playerShield');
		this.dashSFX = this.scene.sound.add('playerDash');
		this.i = 0;

		this.bullets = new BulletContainer(5, this);
	}

	static loadAssets(scene){
		scene.load.spritesheet('player', 'assets/game/player/idle.png', {frameWidth: 50, frameHeight: 50});
		Meter.loadAssets(scene);
		BulletContainer.loadAssets(scene);

		scene.load.audio('playerShoot', ['assets/audio/playerShoot.mp3', 'assets/audio/playerShoot.ogg']);
		scene.load.audio('playerDash', ['assets/audio/playerDash.mp3', 'assets/audio/playerDash.ogg']);
		scene.load.audio('playerShield', ['assets/audio/playerShield.mp3', 'assets/audio/playerShield.ogg']);
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'player_idle',
			frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 4}),
			frameRate: 8,
			repeat: -1
		});
	}

	removeAnimations(){
		this.scene.anims.remove('player_idle');
	}

	listenKeystrokes(){
		this.scene.input.keyboard.on('keydown', e => {
			this.scene.game.controller.press(e.code);
		})
		this.scene.input.keyboard.on('keyup', e => {
			this.scene.game.controller.release(e.code);
			this.i = 0;
		})
	}

	update(){
		if (this.scene.game.controller.pressingButton()){
			this.scene.game.controller.pressingButton('left') ? this.x-=3: ''
			this.scene.game.controller.pressingButton('up') ? this.y-=3: ''
			this.scene.game.controller.pressingButton('down') ? this.y+=3: ''
			this.scene.game.controller.pressingButton('right') ? this.x+=3: ''
		}

		if (this.scene.game.controller.pressingButton('shoot') &&
			this.scene.game.controller.pressingButton('shield')){
			if (this.i === 0){
				this.dashSFX.play();
			}
			this.i = (this.i + 1) % 60;
		} else if (this.scene.game.controller.pressingButton('shoot')){
			if (this.i === 0){
				if (this.bullets.fire()){
					this.shootSFX.play();
				}
			}
			this.i = (this.i + 1) % 10;
		} else if (this.scene.game.controller.pressingButton('shield')){
			if (this.i === 0){
				this.shieldSFX.play();
			}
			this.i = (this.i + 1) % 60;
		}
		this.sprite.x = this.x;
		this.sprite.y = this.y;

		this.meter.update();
		this.bullets.update();
	}
}