let Background = require('../entities/Background');
let Boss = require('../entities/Boss');
let Player = require('../entities/Player');

module.exports = class extends Phaser.Scene {
	constructor(){
		super({key: 'Game', active: false});
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
		this.player = new Player(180, 500, this);
		this.boss = new Boss(180, 100, this);
	}

	update(){
		if (!this.disableBackground) this.background.update();
		this.boss.update();
		this.player.update();
	}
}