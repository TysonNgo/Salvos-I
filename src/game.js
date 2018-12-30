let Controller = require('./Controller');
Controller = new Controller();

const MainMenu = require('./scenes/MainMenu');
const Game = require('./scenes/Game');

const config = {
	type: Phaser.AUTO,
	width: 360,
	height: 640,
	backgroundColor: 0xffffff,
	scene: [MainMenu, Game]
};

const game = new Phaser.Game(config);
