module.exports =  class extends Phaser.Scene {
	constructor(){
		super({key: 'MainMenu', active: true});

		this.shipI = 0;
		this.shipIMax = 20;
		this.shipY = 195;

		// frame buffer for adjusting input timing
		this.i = 0;
		this.ix = 10;
	}

	preload(){
		this.load.image('menuBox', 'assets/menu/menuBox.png');
		this.load.image('title', 'assets/menu/title.png');
		this.load.image('ship', 'assets/menu/ship.png');
		this.load.spritesheet('menuCursor', 'assets/menu/menuCursor.png', {frameWidth: 280, frameHeight: 27});
	}

	create(){
		let centerX = this.game.canvas.width/2;

		this.ship = this.add.sprite(centerX, this.shipY, 'ship');

		this.add.sprite(centerX, this.game.canvas.height/8,'title');

		// menu box
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		let menuY = this.game.canvas.height/3*2;
		this.menuBox = this.add.sprite(centerX, menuY,'menuBox');
		this.graphics = this.add.graphics({fillStyle: {color : 0xffffff}, lineStyle: {color: 0}});

		this.cursorPositionsY = [320, 389, 461];
		this.cursorPosition = 0;

		this.drawMenuBoxes();

		this.createAnimations();
		this.menuCursor = this.add.sprite(centerX, this.cursorPositionsY[this.cursorPosition], 'menuCursor');
		this.menuCursor.anims.play('menuCursorAnimation')
		////////////////////////////////////////////////////////////////////////////////////////////////////////

		this.input.keyboard.on('keydown', e => {
			this.game.controller.press(e.key);
		})
		this.input.keyboard.on('keyup', e => {
			this.game.controller.release(e.key);
			this.i = 0;
		})
	}

	createAnimations(){
		this.anims.create({
			key: 'menuCursorAnimation',
			frames: this.anims.generateFrameNumbers('menuCursor', {start: 0, end: 2}),
			frameRate: 6,
			repeat: -1
		});
	}

	moveCursor(){
		this.menuCursor.y = this.cursorPositionsY[this.cursorPosition];
	}

	drawMenuBoxes(){
		this.drawMenuBox(0,'START');
		this.drawMenuBox(1,'CONFIG');
		this.drawMenuBox(2,'HOW TO PLAY');
	}

	drawMenuBox(menuPos, text){
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

		let startBox = [centerX-buttonBoxWidth/2, buttonBoxFirstY+buttonBoxYOffset*menuPos, buttonBoxWidth, buttonBoxHeight];
		this.graphics.fillRect(...startBox);
		this.graphics.strokeRect(...startBox);
		this.add.text(centerX, this.cursorPositionsY[menuPos], text, buttonStyle).setOrigin(0.5);
	}

	update(){
		// moves ship
		this.ship.y = this.shipY + 7 * Math.sin(0.1*this.shipI++ / Math.PI)

		if (this.game.controller.pressingButton('down')){
			if (this.i === 0){
				this.cursorPosition = (this.cursorPosition + 1) % this.cursorPositionsY.length;
			}
			this.i = (this.i + 1) % this.ix;
		}
		if (this.game.controller.pressingButton('up')){
			if (this.i === 0){
				this.cursorPosition = (this.cursorPosition + this.cursorPositionsY.length - 1) % this.cursorPositionsY.length;
			}
			this.i = (this.i + 1) % this.ix;
		}
		this.moveCursor();

		if (this.game.controller.pressingButton('shoot') && this.cursorPosition === 0){
			this.scene.start('Game');
		}
	}
}