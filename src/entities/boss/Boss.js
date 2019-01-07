const Entity = require('../Entity');
const Missile = require('./Missile');

module.exports = class Boss extends Entity{
	constructor(scene, x, y){
		super(x, y, 125, 110);
		this.scene = scene;
		this.scene.addObject('boss', this);
		this.createAnimations();

		this.sprite = this.scene.add.sprite(this.x, this.y, 'boss');
		this.spriteJetfire = this.scene.add.sprite(this.x, this.y, 'boss_jetfire');
		this.spriteJetfire.anims.play('boss_jetfire_animation');

		this.missile = new Missile(this);
		/* conceptualizing boss patterns
		this.shoot = false;
		this.spriteOrb = this.scene.add.sprite(this.x-40, this.y+40, 'boss_orb');
		this.spriteChargedOrb = this.scene.add.sprite(this.x+1, this.y+58, 'boss_orb');
		this.spriteChargedOrb.anims.play('boss_charge_orb')
		this.spriteChargedOrb.on('animationcomplete', () => {
			this.shoot = true;
			this.finalX = (this.scene.objects.player[0].x-this.spriteChargedOrb.x)/15
			this.finalY = (this.scene.objects.player[0].y-this.spriteChargedOrb.y)/15
		}, this.scene)


		this.graphics = this.scene.add.graphics({lineStyle: {color : 0, width: 7}});
		this.graphics.depth =  -5;
		this.i = 0;
		this.graphics.strokeCircle(this.x, this.y, 100)
		*/
	}

	static loadAssets(scene){
		Missile.loadAssets(scene);
		scene.load.image('boss', 'assets/game/boss/idle.png');
		scene.load.spritesheet('boss_orb', 'assets/game/boss/orb.png', {frameWidth: 56, frameHeight: 56});
		scene.load.spritesheet('boss_jetfire', 'assets/game/boss/jetfire.png', {frameWidth: 214, frameHeight: 191});
	}

	createAnimations(){
		this.scene.anims.create({
			key: 'boss_jetfire_animation',
			frames: this.scene.anims.generateFrameNumbers('boss_jetfire', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'boss_charge_orb',
			frames: this.scene.anims.generateFrameNumbers('boss_orb', {start: 0, end: 5}),
			frameRate: 5,
		});
	}

	removeAnimations(){
		this.scene.anims.remove('boss_jetfire_animation');
		this.scene.anims.remove('boss_charge_orb');
	}

	hit(){
		
	}

	update(){
		/*
		if (this.spriteChargedOrb.y >= this.scene.game.canvas.height){
			this.spriteChargedOrb.x = this.x+1;
			this.spriteChargedOrb.y = this.y+58
			this.spriteChargedOrb.anims.play('boss_charge_orb')
			this.shoot = false;
		}
		else if (this.shoot){
			this.spriteChargedOrb.x += this.finalX
			this.spriteChargedOrb.y += this.finalY
		}
		this.graphics.clear()
		this.graphics.strokeCircle(this.x, this.y, this.i);
		this.graphics.alpha = this.i % 120 /120;
		this.graphics.alpha = this.graphics.alpha >= 0.6 ? 1 : 0.2;
		this.i = (this.i+3) % 700;
		*/

		this.spriteJetfire.x = this.x;
		this.sprite.y = this.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;

		this.missile.update();
	}
}