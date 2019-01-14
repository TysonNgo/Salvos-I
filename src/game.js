const MainMenu = require('./scenes/MainMenu');
const GameScene = require('./scenes/Game');
const Controller = require('./Controller');

class Game extends Phaser.Game{
	constructor(config){
		super(config);
		this.controller = new Controller();
		let buttonConfig = localStorage.getItem('buttonConfig');
		if (buttonConfig){
			try{
				buttonConfig = JSON.parse(buttonConfig);
				for (let button in buttonConfig){
					this.controller.changeKey(button, buttonConfig[button]);
				}
			} catch (e){
				console.log(e);
			}
		}
	}
}

/*
const GameSceneDebug = require('./scenes/GameDebug');
GameSceneDebug(GameScene);
*/

const config = {
	type: Phaser.AUTO,
	width: 360,
	height: 640,
	backgroundColor: 0xffffff,
	scene: [MainMenu, GameScene],
	disableContextMenu: true
};

const game = new Game(config);
