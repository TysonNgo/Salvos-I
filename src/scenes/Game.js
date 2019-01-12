let Background = require('../entities/Background');
let Boss = require('../entities/boss/Boss');
let Player = require('../entities/player/Player');
let Timer = require('../entities/Timer');

module.exports = class extends Phaser.Scene {
	constructor(){
		super({key: 'Game', active: false});
		this.objects = {};
	}

	addObject(key, obj){
		if (key in this.objects){
			this.objects[key].push(obj);
		} else {
			this.objects[key] = [obj];
		}
	}

	destroyObjects(){
		for (let k in this.objects){
			delete this.objects[k];
		}
	}

	init(data){
		this.disableBackground = data.disableBackground;
	}

	preload(){
		if (!this.disableBackground) Background.loadAssets(this);
		this.load.image('menuBox', 'assets/menu/menuBox.png');
		this.load.spritesheet('menuCursor', 'assets/menu/menuCursor.png', {frameWidth: 280, frameHeight: 27});

		this.load.audio('menuSelect', ['assets/audio/menuSelect.mp3', 'assets/audio/menuSelect.ogg']);
		this.load.audio('menuBack', ['assets/audio/menuBack.mp3', 'assets/audio/menuBack.ogg']);
		this.load.audio('menuClick', ['assets/audio/menuClick.mp3', 'assets/audio/menuClick.ogg']);
		Boss.loadAssets(this);
		Player.loadAssets(this);
	}

	create(){
		this.menuSelect = this.sound.add('menuSelect');
		this.menuBack = this.sound.add('menuBack');
		this.menuClick = this.sound.add('menuClick');

		if (!this.disableBackground) {
			this.background = new Background(this);
		}

		this.timer = new Timer(this);

		this.player = new Player(this, 180, 500);
		this.boss = new Boss(this, 180, 100);
	}

	update(){
		if (!this.disableBackground) this.background.update();
		this.timer.update();
		this.boss.update();
		this.player.update();
	}
}