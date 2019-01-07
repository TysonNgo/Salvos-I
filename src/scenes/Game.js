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
		this.debugFps.depth = 1000;
		this.debugHitbox = this.add.graphics({lineStyle: {color : 0xff0000}});
		this.debugHitbox.depth = 1000;
	}

	update(){
		if (!this.disableBackground) this.background.update();
		this.timer.update();
		this.boss.update();
		this.player.update();

		this.debugHitbox.clear();
		for (let k in this.objects){
			this.objects[k].forEach(o => {
				if (!o.height){
					this.debugHitbox.lineStyle(1, 0x006600)
					this.debugHitbox.strokeCircle(o.x, o.y, o.radius);
				}
				o.hitboxes.forEach(h => {
					this.debugHitbox.lineStyle(1, 0xff0000)
					this.debugHitbox.strokeRect(o.x+h.x, o.y+h.y, h.width, h.height);
				})
			})
		}

		this.debugFps.setText(this.game.loop.actualFps.toFixed(1))
	}
}