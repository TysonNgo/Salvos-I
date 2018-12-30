module.exports =  class extends Phaser.Scene {
	constructor(){
		super({key: 'MainMenu', active: true});
	}
	preload(){

	}
	create(){
		this.input.keyboard.on('keydown', e => {
			this.scene.start('Game')
		})
	}
}