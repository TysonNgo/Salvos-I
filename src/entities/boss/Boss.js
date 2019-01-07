const Entity = require('../Entity');
const trapInBounds = require('../trapInBounds');
const Missile = require('./Missile');
const Orb = require('./Orb');
const Radar = require('./RadarAttack');

class Boss extends Entity{
	constructor(scene, x, y){
		super(x, y, 125, 110);
		this.scene = scene;
		this.scene.addObject('boss', this);
		this.createAnimations();

		this.sprite = this.scene.add.sprite(this.x, this.y, 'boss');
		this.spriteJetfire = this.scene.add.sprite(this.x, this.y, 'boss_jetfire');
		this.spriteJetfire.anims.play('boss_jetfire_animation');

		this.missile = new Missile(this);
		// conceptualizing boss patterns
		this.orb = new Orb(this);
		this.radar = new Radar(this);
	}

	static loadAssets(scene){
		Missile.loadAssets(scene);
		Orb.loadAssets(scene);
		scene.load.image('boss', 'assets/game/boss/idle.png');
		scene.load.spritesheet('boss_jetfire', 'assets/game/boss/jetfire.png', {frameWidth: 214, frameHeight: 191});
	}

	addHitboxes(){
		this.hitboxes.push({
			x: -30.5,
			y: -59,
			width: 65,
			height: 110
		},{
			x: -59.5,
			y: -19,
			width: 123,
			height: 62
		},{
			x: -70.5,
			y: 23,
			width: 145,
			height: 13
		})
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
		this.spriteJetfire.x = this.x;
		this.sprite.y = this.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;

		this.missile.update();
		this.radar.update();
	}
}

trapInBounds(Boss);

module.exports = Boss;