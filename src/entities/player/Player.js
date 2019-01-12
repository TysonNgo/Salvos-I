const Entity = require('../Entity');
const trapInBounds = require('../trapInBounds');
const Meter = require('./Meter');
const ClearRadius = require('./ClearRadius');
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
		this.speed = 3;
		this.isDashing = false;
		
		this.sprite = this.scene.add.sprite(this.x, this.y, 'player');
		this.spriteAfterImages = [
			scene.add.sprite(this.x, this.y, 'player'),
			scene.add.sprite(this.x, this.y, 'player'),
			scene.add.sprite(this.x, this.y, 'player')
		]
		this.spriteAfterImages.forEach((img, i) => {
			img.tint = 0x3333e6;
			img.alpha = 1 - i/this.spriteAfterImages.length;
			img.depth = -(i+1);
			img.visible = false;
		})

		this.spriteShield = this.scene.add.sprite(this.x, this.y, 'player_shield');
		this.spriteShield.visible = false;
		this.spriteJetfire = this.scene.add.sprite(this.x, this.y, 'player_jetfire');
		this.spriteJetfire.anims.play('player_jetfire_animation');

		this.meter = new Meter(0, this.scene);

		this.shootSFX = this.scene.sound.add('playerShoot');
		this.shieldSFX = this.scene.sound.add('playerShield');
		this.dashSFX = this.scene.sound.add('playerDash');
		this.specialSFX = this.scene.sound.add('playerSpecial');
		this.deathSFX = this.scene.sound.add('playerDeath');

		this.bullets = new BulletContainer(5, this);
		this.special = new ClearRadius(this);
	}

	static loadAssets(scene){
		scene.load.spritesheet('player', 'assets/game/player/player.png', {frameWidth: 50, frameHeight: 50});
		scene.load.image('player_shield', 'assets/game/player/shield.png');
		scene.load.spritesheet('player_jetfire', 'assets/game/player/jetfire.png', {frameWidth: 50, frameHeight: 50});
		Meter.loadAssets(scene);
		BulletContainer.loadAssets(scene);
		ClearRadius.loadAssets(scene);

		scene.load.audio('playerShoot', ['assets/audio/playerShoot.mp3', 'assets/audio/playerShoot.ogg']);
		scene.load.audio('playerDash', ['assets/audio/playerDash.mp3', 'assets/audio/playerDash.ogg']);
		scene.load.audio('playerShield', ['assets/audio/playerShield.mp3', 'assets/audio/playerShield.ogg']);
		scene.load.audio('playerSpecial', ['assets/audio/playerSpecial.mp3', 'assets/audio/playerSpecial.ogg']);
		scene.load.audio('playerDeath', ['assets/audio/playerDeath.mp3', 'assets/audio/playerDeath.ogg']);
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'player_death_animation',
			frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 13}),
			frameRate: 30
		});

		this.scene.anims.create({
			key: 'player_jetfire_animation',
			frames: this.scene.anims.generateFrameNumbers('player_jetfire', {start: 0, end: 4}),
			frameRate: 8,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'menuCursorAnimation',
			frames: this.scene.anims.generateFrameNumbers('menuCursor', {start: 0, end: 2}),
			frameRate: 6,
			repeat: -1
		});
	}

	removeAnimations(){
		this.scene.anims.remove('player_death_animation');
		this.scene.anims.remove('player_jetfire_animation');
		this.scene.anims.remove('menuCursorAnimation');
		this.special.removeAnimations();
	}

	listenKeystrokes(){
		this.scene.input.keyboard.on('keydown', e => {
			this.scene.game.controller.press(e.code);
		})
		this.scene.input.keyboard.on('keyup', e => {
			this.scene.game.controller.release(e.code);
		})
	}

	hit(){
		this.scene.timer.stop();
		this.sprite.anims.play('player_death_animation');
		this.deathSFX.play();
		this.sprite.on('animationcomplete', function(){
			this.visible = false;
		}, this.sprite)
		this.spriteJetfire.destroy();
		this.spriteAfterImages.forEach(s => s.destroy());

		let menu = this.scene.add.sprite(this.scene.game.canvas.width/2, this.scene.game.canvas.height/2, 'menuBox')

		// to draw boxes
		let graphics = this.scene.add.graphics({
			lineStyle: {color: 0},
			fillStyle: {color: 0xffffff}
		})
		let cursor = this.scene.add.sprite(this.scene.game.canvas.width/2, 0, 'menuCursor');
		cursor.anims.play('menuCursorAnimation');

		let buttonStyle = {
			fontFamily: 'Kong Text',
			fill: '#000',
			backgroundColor: '#fff'
		}

		// retry/main menu buttons
		let width = 190;
		let height = 75;
		let centerX = this.scene.game.canvas.width/2;
		let x = centerX - width/2;
		let retry = [x, 308, width, height];
		let mainmenu = [x, 390, width, height];
		graphics.strokeRect(...retry);
		graphics.fillRect(...retry);
		graphics.strokeRect(...mainmenu);
		graphics.fillRect(...mainmenu);

		// time achieved
		let time = this.scene.timer.getHHMMSS();
		this.scene.add.text(centerX, 185, `Time achieved:`, buttonStyle)
			.setOrigin(0.5)
			.setFontSize(10);
		this.scene.add.text(centerX, 210, `${time.h}:${time.m}:${time.s}`, buttonStyle)
			.setOrigin(0.5)
			.setFontSize(19);

		// best time
		// TODO

		this.scene.add.text(centerX, retry[1]+37, 'RETRY', buttonStyle).setOrigin(0.5);
		this.scene.add.text(centerX, mainmenu[1]+37, 'Main Menu', buttonStyle).setOrigin(0.5);

		cursor.y = retry[1]+37;

		let option = 0;
		let i = 0;
		let j = 0;
		let changeScene = false;

		this.update = function(){
			if (j >= 60){
				if (this.scene.game.controller.pressingButton('up')){
					if (i === 0){
						option = +!option;
						this.scene.menuSelect.play();
					}
					i = (i+1) % 10;
				} else if (this.scene.game.controller.pressingButton('down')){
					if (i === 0){
						option = +!option;
						this.scene.menuSelect.play();
					}
					i = (i+1) % 10;
				}

				if (this.scene.game.controller.pressingButton('shoot')){
					this.scene.player.removeAnimations();
					this.scene.boss.removeAnimations();
					this.scene.destroyObjects();
					if (option === 0 && !changeScene){
						this.scene.menuClick.play();
						this.scene.scene.start('Game');
					} else if (option === 1 && !changeScene){
						this.scene.menuClick.play();
						this.scene.scene.start('MainMenu');
					}
					changeScene = true;
				}
			}
			j++;
			cursor.y = [retry[1], mainmenu[1]][option]+37;
			this.meter.update();
			this.bullets.update();
			this.special.update();
		}
	}

	updateSprite(){
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.spriteJetfire.x = this.x;
		this.spriteJetfire.y = this.y;
	}

	update(){
		if (!this.isDashing){
			this.scene.game.controller.pressingButton('left') ? this.x-=this.speed: ''
			this.scene.game.controller.pressingButton('up') ? this.y-=this.speed: ''
			this.scene.game.controller.pressingButton('down') ? this.y+=this.speed: ''
			this.scene.game.controller.pressingButton('right') ? this.x+=this.speed: ''
		}
		this.updateSprite();

		this.meter.update();
		this.bullets.update();
		this.special.update();

		// player dies if touched by the boss
		// or its projectiles unless the player
		// has a shield active
		for (let key in this.scene.objects){
			if (key.startsWith('boss')){
				this.scene.objects[key].forEach(obj => {
					if (this.collidesWith(obj) && obj.active && !this.shieldActive){
						this.hit();
					}
				})
			}
		}
	}
}

addShoot(Player);
addShield(Player);
addDash(Player);
addSpecials(Player);
trapInBounds(Player);

module.exports = Player;