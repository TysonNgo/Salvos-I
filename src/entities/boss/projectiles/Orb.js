const Entity = require('../../Entity');

module.exports = class Orb extends Entity{
	constructor(boss){
		super(boss.x, boss.y, 6, 6);
		this.boss = boss;
		this.boss.scene.addObject('boss_orb', this);

		this.shoot = false;

		this.y += 80;
		this.sprite = this.boss.scene.add.sprite(this.x, this.y, 'boss_orb');
		/*
		this.spriteChargedOrb = this.scene.add.sprite(this.x+1, this.y+58, 'boss_orb');
		this.spriteChargedOrb.anims.play('boss_charge_orb')
		this.spriteChargedOrb.on('animationcomplete', () => {
			this.shoot = true;
			this.finalX = (this.scene.objects.player[0].x-this.spriteChargedOrb.x)/15
			this.finalY = (this.scene.objects.player[0].y-this.spriteChargedOrb.y)/15
		}, this.scene)
		*/
	}

	static loadAssets(scene){
		scene.load.spritesheet('boss_orb', 'assets/game/boss/orb.png', {frameWidth: 56, frameHeight: 56});
	}

	static createAnimations(scene){
		scene.anims.create({
			key: 'boss_charge_orb',
			frames: scene.anims.generateFrameNumbers('boss_orb', {start: 0, end: 5}),
			frameRate: 5,
		});
	}

	static removeAnimations(scene){
		scene.anims.remove('boss_charge_orb');
	}

	destroy(){
		this.active = false;
	}

	update(){
		/*
		if (this.spriteChargedOrb.y >= this.boss.scene.game.canvas.height){
			this.spriteChargedOrb.x = this.x+1;
			this.spriteChargedOrb.y = this.y+58
			this.spriteChargedOrb.anims.play('boss_charge_orb')
			this.shoot = false;
		}
		else if (this.shoot){
			this.spriteChargedOrb.x += this.finalX
			this.spriteChargedOrb.y += this.finalY
		}
		*/
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.active;
	}
}