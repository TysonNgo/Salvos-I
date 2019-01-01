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
	}

	create(){
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