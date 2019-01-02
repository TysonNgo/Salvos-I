module.exports =  class extends Phaser.Scene {
	constructor(){
		super({key: 'MainMenu', active: true});
	}

	preload(){
		// TODO
		// menu options:
		// START GAME
		// CONFIG
		// HOW TO PLAY
		this.load.image('menuBox', 'assets/menu/menuBox.png');
	}

	create(){
		this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/3*2,'menuBox');

		this.start = false;
		this.input.keyboard.on('keydown', e => {
			this.start = true;
		})
	}

	update(){
		if (this.start){
			this.start = false;
			this.scene.start('Game');
		}
	}
}