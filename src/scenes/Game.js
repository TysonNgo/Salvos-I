let Boss = require('../entities/Boss');
let Player = require('../entities/Player');

module.exports = class extends Phaser.Scene {
	constructor(){
		super({key: 'Game', active: false});
	}

	preload(){
		this.load.image('speedline', 'assets/game/speedline.png')
		Boss.loadAssets(this);
		Player.loadAssets(this);
	}

	create(){
		this.speedlines = Array(100);
		for (let i = 0; i < this.speedlines.length; i++){
			this.speedlines[i] = this.add.sprite(
				Math.random() * this.game.config.width,
				Math.random() * this.game.config.height,
				'speedline')
		}

		this.player = new Player(180, 500, this);
		this.boss = new Boss(180, 100, this);
	}

	update(){
		for (let i = 0; i < this.speedlines.length; i++){
			this.speedlines[i].y += 10
			if (this.speedlines[i].y > (this.game.config.height+this.speedlines[i].height)){
				this.speedlines[i].x = Math.random() * this.game.config.width;
				this.speedlines[i].y = Math.random() * this.game.config.height;
				this.speedlines[i].setScale(1, Math.random() * 1.5 + 0.7)
			}
		}

		this.boss.update();
		this.player.update();
	}
}