module.exports = class extends Phaser.Scene {
	constructor(){
		super({key: 'Game', active: false});
	}

	preload(){
		this.load.image('speedline', 'assets/game/speedline.png')
		this.load.image('boss', 'assets/game/boss/idle.png')
		this.load.image('player', 'assets/game/player/idle.png')
	}

	create(){
		this.what = {
			w: false,
			a: false,
			s: false,
			d: false
		}
		this.speedlines = Array(100);
		for (let i = 0; i < this.speedlines.length; i++){
			this.speedlines[i] = this.add.sprite(
				Math.random() * this.game.config.width,
				Math.random() * this.game.config.height,
				'speedline')
		}

		this.player = this.add.sprite(180, 500, 'player')
		this.add.sprite(180, 100, 'boss')

		this.input.keyboard.on('keydown', e => {
			console.log(e.key)
			this.what[e.key] = true;
		})
		this.input.keyboard.on('keyup', e => {
			this.what[e.key] = false;
		})
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

		if (Object.values(this.what).some(i => i)){
			this.what.a ? this.player.x-=3: ''
			this.what.w ? this.player.y-=3: ''
			this.what.s ? this.player.y+=3: ''
			this.what.d ? this.player.x+=3: ''
		}
	}
}