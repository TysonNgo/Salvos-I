module.exports =  class extends Phaser.Scene {
	constructor(){
		super({key: 'MainMenu', active: true});
	}

	preload(){
		this.load.image('menuBox', 'assets/menu/menuBox.png');
		this.load.image('title', 'assets/menu/title.png');
	}

	create(){
		let centerX = this.game.canvas.width/2;
		this.add.sprite(centerX, this.game.canvas.height/8,'title');

		let menuY = this.game.canvas.height/3*2;
		this.menuBox = this.add.sprite(centerX, menuY,'menuBox');
		this.graphics = this.add.graphics({fillStyle: {color : 0xffffff}, lineStyle: {color: 0}});

		this.drawMenuBoxes();

		this.start = false;
		this.input.keyboard.on('keydown', e => {
			this.start = true;
		})
	}

	drawMenuBoxes(){
		let menuY = this.game.canvas.height/3*2;
		let centerX = this.game.canvas.width/2;
		let buttonBoxWidth = 190;
		let buttonBoxHeight = 60;
		let buttonBoxFirstY = 290;
		let buttonBoxYOffset = 70;
		let buttonStyle = {
			fontFamily: 'Kong Text',
			fill: '#000',
			backgroundColor: '#fff'
		}

		let startBox = [centerX-buttonBoxWidth/2, buttonBoxFirstY, buttonBoxWidth, buttonBoxHeight];
		this.graphics.fillRect(...startBox);
		this.graphics.strokeRect(...startBox);
		this.startButton = this.add.text(centerX, this.game.canvas.height/2, 'START', buttonStyle)
		this.startButton.setOrigin(0.5);

		let configBox = [centerX-buttonBoxWidth/2, buttonBoxFirstY+buttonBoxYOffset, buttonBoxWidth, buttonBoxHeight];
		this.graphics.fillRect(...configBox);
		this.graphics.strokeRect(...configBox);
		this.configButton = this.add.text(centerX, menuY-38, 'CONFIG', buttonStyle)
		this.configButton.setOrigin(0.5);

		let howToBox = [centerX-buttonBoxWidth/2, buttonBoxFirstY+buttonBoxYOffset*2, buttonBoxWidth, buttonBoxHeight];
		this.graphics.fillRect(...howToBox);
		this.graphics.strokeRect(...howToBox);
		this.configButton = this.add.text(centerX, menuY+34, 'HOW TO PLAY', buttonStyle)
		this.configButton.setOrigin(0.5);
	}

	update(){
		if (this.start){
			this.start = false;
			this.scene.start('Game');
		}
	}
}