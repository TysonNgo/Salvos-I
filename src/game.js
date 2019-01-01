const MainMenu = require('./scenes/MainMenu');
const GameScene = require('./scenes/Game');
const Controller = require('./Controller');

class Game extends Phaser.Game{
	constructor(config){
		super(config);
		this.controller = new Controller();
	}
}

const config = {
	type: Phaser.AUTO,
	width: 360,
	height: 640,
	backgroundColor: 0xffffff,
	scene: [MainMenu, GameScene]
};

const game = new Game(config);
