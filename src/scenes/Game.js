let Background = require('../entities/Background');
let Boss = require('../entities/boss/Boss');
let Player = require('../entities/player/Player');

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
		this.player = new Player(this, 180, 500);
		this.boss = new Boss(this, 180, 100);

		// debug
		this.input.keyboard.on('keydown', e => {
			if (e.code === 'Backquote'){
				this.player.removeAnimations();
				this.boss.removeAnimations();
				this.destroyObjects();
				this.scene.start('MainMenu');
			}
		})


		this.debugFps = this.add.text(10, this.game.canvas.height-30,`${this.game.loop.actualFps.toFixed(1)} fps`,
		{fontFamily: 'Kong Text', fill: '#000', backgroundColor: '#fff'})
		this.debugHitbox = this.add.graphics({lineStyle: {color : 0xff0000}});
		this.debugHitbox.depth = 1000
	}

	update(){
		if (!this.disableBackground) this.background.update();
		this.boss.update();
		this.player.update();

		this.debugHitbox.clear();
		for (let k in this.objects){
			this.objects[k].forEach(o => {
				this.debugHitbox.strokeRect(o.x-o.width/2, o.y-o.height/2, o.width, o.height);
			})
		}

		this.debugFps.setText(this.game.loop.actualFps.toFixed(1))
	}
}