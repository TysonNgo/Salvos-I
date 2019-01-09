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
		Boss.loadAssets(this);
		Player.loadAssets(this);
	}

	create(){
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