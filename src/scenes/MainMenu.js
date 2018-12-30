let Controller = require('../Controller');

module.exports =  class extends Phaser.Scene {
	constructor(){
		super({key: 'MainMenu', active: true});
		this.controller = new Controller();
	}
	preload(){
		// TODO
		// menu options:
		// START GAME
		// CONFIG
		// HOW TO PLAY
	}
	create(){
		this.input.keyboard.on('keydown', e => {
			this.scene.start('Game')
		})
	}
}