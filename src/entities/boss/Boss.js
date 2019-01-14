const Entity = require('../Entity');
const trapInBounds = require('../trapInBounds');
const Patterns = require('./Patterns');
const Radar = require('./projectiles/Radar');
const Orb = require('./projectiles/Orb');
const Missile = require('./projectiles/Missile');
const ProjectileContainer = require('./ProjectileContainer');

class Boss extends Entity{
	constructor(scene, x, y){
		super(x, y, 125, 110);
		this.scene = scene;
		this.scene.addObject('boss', this);

		// sound effects
		this.fastSFX = this.scene.sound.add('bossFast');
		this.shakeSFX = this.scene.sound.add('bossShake');
		this.retreatSFX = this.scene.sound.add('bossRetreat');
		this.USweepSFX = this.scene.sound.add('bossUSweep');
		this.orbSFX = this.scene.sound.add('bossOrb');
		this.chargeSFX = this.scene.sound.add('bossCharge');
		this.chargedOrbSFX = this.scene.sound.add('bossChargedOrb');
		this.missileSFX = this.scene.sound.add('bossMissile');
		this.trackSFX = this.scene.sound.add('bossTrack');

		this.createAnimations();
		this.patterns = new Patterns(this);

		this.sprite = this.scene.add.sprite(this.x, this.y, 'boss');
		this.spriteJetfire = this.scene.add.sprite(this.x, this.y, 'boss_jetfire');
		this.spriteJetfire.anims.play('boss_jetfire_animation');

		this.numPatterns = 5;

		this.chargedOrb = new ProjectileContainer(this, Orb, this.numPatterns, 'charged');
		this.linearRadialOrbs = new ProjectileContainer(this, Orb, 16*10*this.numPatterns, 'linear');
		this.spiralOrbs = new ProjectileContainer(this, Orb, 16*10*this.numPatterns, 'spiral');
		this.radars = new ProjectileContainer(this, Radar, this.numPatterns);
		this.twinMissiles = new ProjectileContainer(this, Missile, 2*this.numPatterns);;
		this.slowMissile = new ProjectileContainer(this, Missile, this.numPatterns);;
	}

	static loadAssets(scene){
		Patterns.loadAssets(scene);
		scene.load.spritesheet('boss', 'assets/game/boss/boss.png', {frameWidth: 214, frameHeight: 191});
		scene.load.spritesheet('boss_jetfire', 'assets/game/boss/jetfire.png', {frameWidth: 214, frameHeight: 191});

		scene.load.audio('bossFast', ['assets/audio/bossFast.mp3', 'assets/audio/bossFast.ogg']);
		scene.load.audio('bossShake', ['assets/audio/bossShake.mp3', 'assets/audio/bossShake.ogg']);
		scene.load.audio('bossRetreat', ['assets/audio/bossRetreat.mp3', 'assets/audio/bossRetreat.ogg']);
		scene.load.audio('bossUSweep', ['assets/audio/bossUSweep.mp3', 'assets/audio/bossUSweep.ogg']);
		scene.load.audio('bossOrb', ['assets/audio/bossOrb.mp3', 'assets/audio/bossOrb.ogg']);
		scene.load.audio('bossCharge', ['assets/audio/bossCharge.mp3', 'assets/audio/bossCharge.ogg']);
		scene.load.audio('bossChargedOrb', ['assets/audio/bossChargedOrb.mp3', 'assets/audio/bossChargedOrb.ogg']);
		scene.load.audio('bossMissile', ['assets/audio/bossMissile.mp3', 'assets/audio/bossMissile.ogg']);
		scene.load.audio('bossTrack', ['assets/audio/bossTrack.mp3', 'assets/audio/bossTrack.ogg']);
	}

	setRotation(deg){
		this.sprite.angle = deg;
		this.spriteJetfire.angle = deg;
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
		Patterns.createAnimations(this.scene);

		this.scene.anims.create({
			key: 'boss_hit_animation',
			frames: this.scene.anims.generateFrameNumbers('boss', {start: 0, end: 2}),
			frameRate: 12,
			yoyo: true
		});

		this.scene.anims.create({
			key: 'boss_jetfire_animation',
			frames: this.scene.anims.generateFrameNumbers('boss_jetfire', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
	}

	random(){
		// implement a deterministic random function
		return Math.random()
	}

	removeAnimations(){
		Patterns.removeAnimations(this.scene);
		this.scene.anims.remove('boss_hit_animation');
		this.scene.anims.remove('boss_jetfire_animation');
	}

	hit(){
		if (!this.sprite.anims.isPlaying){
			this.sprite.anims.play('boss_hit_animation');
		}
	}

	updateSprite(){
		this.spriteJetfire.visible = this.active;
		this.sprite.visible = this.active;

		this.spriteJetfire.x = this.x;
		this.spriteJetfire.y = this.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}

	updateProjectiles(){
		this.radars.forEach(r => r.update());
		this.linearRadialOrbs.forEach(r => r.update());
		this.spiralOrbs.forEach(r => r.update());
		this.chargedOrb.forEach(r => r.update());
		this.twinMissiles.forEach(r => r.update());
		this.slowMissile.forEach(r => r.update());
	}

	update(){
		this.updateSprite();
		this.updateProjectiles();
		this.patterns.exec();
	}
}

trapInBounds(Boss);

module.exports = Boss;