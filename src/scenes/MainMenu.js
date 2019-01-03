// this scene has messy code
// refactor some time
module.exports =  class extends Phaser.Scene {
	constructor(){
		super({key: 'MainMenu', active: true});

		this.shipI = 0;
		this.shipIMax = 20;
		this.shipY = 195;

		// frame buffer for adjusting input timing
		this.i = 0;
		this.ix = 10;

		this.menuEnum = {
			main: 0,
			config: 1,
			howto: 2
		}

		this.changingKey = false;
		this.buttonToChange = null;
	}

	preload(){
		this.load.image('menuBox', 'assets/menu/menuBox.png');
		this.load.image('updown', 'assets/menu/updown.png');
		this.load.image('title', 'assets/menu/title.png');
		this.load.image('ship', 'assets/menu/ship.png');
		this.load.spritesheet('menuCursor', 'assets/menu/menuCursor.png', {frameWidth: 280, frameHeight: 27});

		this.load.audio('menuSelect', ['assets/audio/menuSelect.mp3', 'assets/audio/menuSelect.ogg']);
		this.load.audio('menuBack', ['assets/audio/menuBack.mp3', 'assets/audio/menuBack.ogg']);
	}

	create(){
		// audio
		this.menuSelect = this.sound.add('menuSelect');
		this.menuBack = this.sound.add('menuBack');

		let centerX = this.game.canvas.width/2;

		this.ship = this.add.sprite(centerX, this.shipY, 'ship');

		this.add.sprite(centerX-3, this.game.canvas.height/8,'title');

		// menu box
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		let menuY = this.game.canvas.height/3*2;
		this.menuBox = this.add.sprite(centerX, menuY,'menuBox');
		this.graphics = this.add.graphics({fillStyle: {color : 0xffffff}, lineStyle: {color: 0}});

		this.menu = this.menuEnum.main;
		this.cursorPositionsY = {
			[this.menuEnum.main]: [320, 389, 461],
			[this.menuEnum.config]: [555, 310, 350, 390, 430, 470, 510],
			[this.menuEnum.howto]: [555]
		}
		this.cursorPosition = {
			[this.menuEnum.main]: 0,
			[this.menuEnum.config]: 1,
			[this.menuEnum.howto]: 0
		}

		this.createAnimations();
		this.menuCursor = this.add.sprite(centerX, this.cursorPositionsY[this.menu][this.cursorPosition[this.menu]], 'menuCursor');
		this.menuCursor.anims.play('menuCursorAnimation')

		this.menuObjects = [];
		this.drawMenu();
		////////////////////////////////////////////////////////////////////////////////////////////////////////

		this.add.text(this.game.canvas.width-5, this.game.canvas.height-5, 'made by Tyson Ngo',
			{fontFamily: 'Kong Text', fontSize: '8.5pt', fill: '#000', backgroundColor: '#fff'}).setOrigin(1);

		this.input.keyboard.on('keydown', e => {
			if (this.changingKey){
				this.changingKey = false;
				if (e.code === 'Escape') return this.drawMenu(this.menu);
				this.game.controller.changeKey(this.buttonToChange, e.code);
				localStorage.setItem('buttonConfig', JSON.stringify({
					'up': this.game.controller.getKey('up'),
					'down': this.game.controller.getKey('down'),
					'left': this.game.controller.getKey('left'),
					'right': this.game.controller.getKey('right'),
					'shoot': this.game.controller.getKey('shoot'),
					'shield': this.game.controller.getKey('shield')
				}))
				this.drawMenu(this.menu);
			} else {
				this.game.controller.press(e.code);
			}
		})
		this.input.keyboard.on('keyup', e => {
			this.game.controller.release(e.code);
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

	removeAnimations(){
		this.anims.remove('menuCursorAnimation');
	}

	moveCursor(){
		this.menuCursor.y = this.cursorPositionsY[this.menu][this.cursorPosition[this.menu]];
	}

	drawMenu(menu = 0){
		this.graphics.clear();
		this.menuObjects.forEach(o => {
			o.destroy();
		})
		this.menu = menu;
		switch(this.menu){
			case this.menuEnum.main:
				this.menuObjects.push(...this.drawMenuBoxes());
				// menu keys display
				this.menuObjects.push(this.add.sprite(145, 538, 'updown'));
				let style = {
					fontFamily: 'Kong Text',
					fontSize: '8.5pt',
					fill: '#000',
					backgroundColor: '#fff'
				}
				this.menuObjects.push(this.add.text(125, 505, this.game.controller.getKey('up'), style));
				this.menuObjects.push(this.add.text(125, 560, this.game.controller.getKey('down'), style));
				this.menuObjects.push(this.add.text(196, 533, this.game.controller.getKey('shoot'), style));
			break;
			case this.menuEnum.config:
				this.menuObjects.push(...this.drawMenuBoxes());
			break;
			case this.menuEnum.howto:
				this.menuObjects.push(...this.drawMenuBoxes());
			break;
		}
	}

	drawMenuBoxes(){
		let boxes = [];
		let box;
		switch(this.menu){
			case this.menuEnum.main:
				box = [190, 60, 290, 70];
				boxes.push(this.drawMenuBox(0,'START', ...box));
				boxes.push(this.drawMenuBox(1,'CONFIG', ...box));
				boxes.push(this.drawMenuBox(2,'HOW TO PLAY', ...box));
				break;
			case this.menuEnum.config:
				box = [190, 30, 533, -40];
				boxes.push(this.drawMenuBox(0,'BACK', 190, 40, 533, 70));
				let style = {
					fontFamily: 'Kong Text',
					fill: '#000',
					backgroundColor: '#fff'
				}
				let text = [null, 'UP', 'DOWN', 'LEFT', 'RIGHT', 'SHOOT', 'SHIELD'];
				for (let i = 1; i < this.cursorPositionsY[this.menu].length; i++){
					this.drawMenuBox(i,'', ...box);
					style.fontSize = '13px';
					boxes.push(this.add.text(130, this.cursorPositionsY[this.menu][i], text[i], style).setOrigin(0.5));
					style.fontSize = '8px';
					boxes.push(this.add.text(180, this.cursorPositionsY[this.menu][i]-3, this.game.controller.getKey(text[i].toLowerCase()), style));
				}
				break;
			case this.menuEnum.howto:
				box = [190, 40, 533, 70];
				boxes.push(this.drawMenuBox(0,'BACK', ...box));
				break;
		}
		return boxes;
	}

	drawMenuBox(menuPos, text, boxWidth, boxHeight, boxFirstY, boxYOffset){
		let menuY = this.game.canvas.height/3*2;
		let centerX = this.game.canvas.width/2;
		let buttonStyle = {
			fontFamily: 'Kong Text',
			fill: '#000',
			backgroundColor: '#fff'
		}

		let box = [centerX-boxWidth/2, boxFirstY+boxYOffset*menuPos, boxWidth, boxHeight];
		this.graphics.fillRect(...box);
		this.graphics.strokeRect(...box);
		if (text){
			return this.add.text(centerX, this.cursorPositionsY[this.menu][menuPos], text, buttonStyle).setOrigin(0.5);
		}
	}

	update(){
		// moves ship
		this.ship.y = this.shipY + 7 * Math.sin(0.1*this.shipI++ / Math.PI)

		if (this.changingKey) return;
		// key input
		if (this.game.controller.pressingButton('down')){
			if (this.i === 0){
				this.cursorPosition[this.menu] = (this.cursorPosition[this.menu] + 1) % this.cursorPositionsY[this.menu].length;
				this.menuSelect.play();
			}
			this.i = (this.i + 1) % this.ix;
		}
		if (this.game.controller.pressingButton('up')){
			if (this.i === 0){
				this.cursorPosition[this.menu] = (this.cursorPosition[this.menu] + this.cursorPositionsY[this.menu].length - 1) % this.cursorPositionsY[this.menu].length;
				this.menuSelect.play();
			}
			this.i = (this.i + 1) % this.ix;
		}
		this.moveCursor();

		if (this.game.controller.pressingButton('shoot')){
			if (this.i === 0){
				if (this.menu === this.menuEnum.main){
					switch(this.cursorPosition[this.menu]){
						case 0: this.removeAnimations(); this.scene.start('Game'); break;
						case 1: this.drawMenu(this.menuEnum.config); break;
						case 2: this.drawMenu(this.menuEnum.howto); break;
					}
				} else if (this.menu === this.menuEnum.config){
					let buttons = [null, 'up', 'down', 'left', 'right', 'shoot', 'shield'];
					switch(this.cursorPosition[this.menu]){
						case 0:
							this.cursorPosition[this.menu] = 1;
							this.drawMenu(this.menuEnum.main);
							this.menuBack.play();
							break;
						case 1: case 2: case 3:
						case 4: case 5: case 6:
							this.graphics.fillRect(50, 135, this.game.canvas.width-100, 150);
							this.graphics.strokeRect(50, 135, this.game.canvas.width-100, 150);
							this.menuObjects.push(
								this.add.text(80,165, 
									`Press a key\nto change the\n'${buttons[this.cursorPosition[this.menu]]}' button\n\nESC to cancel`,
									{fontFamily: 'Kong Text', fill: '#000', backgroundColor: '#fff'})
							);
							this.changingKey = true;
							this.buttonToChange = buttons[this.cursorPosition[this.menu]];
							break;
					}
				} else if (this.menu === this.menuEnum.howto){
					this.drawMenu(this.menuEnum.main);
					this.menuBack.play();
				}
			}
			this.i = (this.i + 1) % this.ix;
		}
	}
}