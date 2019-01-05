const Entity = require('../Entity');
const Meter = require('./Meter');
const BulletContainer = require('./BulletContainer');
const addDash = require('./Dash');
const addShoot = require('./Shoot');
const addShield = require('./Shield');
const addSpecials = require('./Specials');

class Player extends Entity{
	constructor(scene, x, y){
		super(x, y, 12, 12);
		this.scene = scene;
		this.scene.addObject('player', this);
		this.createAnimations();
		this.listenKeystrokes();
		
		this.sprite = this.scene.add.sprite(this.x, this.y, 'player');
		this.spriteShield = this.scene.add.sprite(this.x, this.y, 'player_shield');
		this.spriteShield.visible = false;
		this.spriteJetfire = this.scene.add.sprite(this.x, this.y, 'player_jetfire');
		this.spriteJetfire.anims.play('player_jetfire_animation');

		this.meter = new Meter(0, this.scene);

		this.shootSFX = this.scene.sound.add('playerShoot');
		this.shieldSFX = this.scene.sound.add('playerShield');
		this.dashSFX = this.scene.sound.add('playerDash');
		this.specialSFX = this.scene.sound.add('playerSpecial');

		this.bullets = new BulletContainer(5, this);
	}

	static loadAssets(scene){
		scene.load.image('player', 'assets/game/player/idle.png');
		scene.load.image('player_shield', 'assets/game/player/shield.png');
		scene.load.spritesheet('player_jetfire', 'assets/game/player/jetfire.png', {frameWidth: 50, frameHeight: 50});
		Meter.loadAssets(scene);
		BulletContainer.loadAssets(scene);

		scene.load.audio('playerShoot', ['assets/audio/playerShoot.mp3', 'assets/audio/playerShoot.ogg']);
		scene.load.audio('playerDash', ['assets/audio/playerDash.mp3', 'assets/audio/playerDash.ogg']);
		scene.load.audio('playerShield', ['assets/audio/playerShield.mp3', 'assets/audio/playerShield.ogg']);
		scene.load.audio('playerSpecial', ['assets/audio/playerSpecial.mp3', 'assets/audio/playerSpecial.ogg']);
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'player_jetfire_animation',
			frames: this.scene.anims.generateFrameNumbers('player_jetfire', {start: 0, end: 4}),
			frameRate: 8,
			repeat: -1
		});
	}

	removeAnimations(){
		this.scene.anims.remove('player_jetfire_animation');
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
		this.spriteJetfire.x = this.x;
		this.spriteJetfire.y = this.y;

		this.meter.update();
		this.bullets.update();
	}
}

addDash(Player);
addShoot(Player);
addShield(Player);
addSpecials(Player);

module.exports = Player;