const Entity = require('../../Entity');

module.exports = class Orb extends Entity{
	constructor(boss, type){
		super(boss.x, boss.y, 6, 6);
		this.boss = boss;
		this.boss.scene.addObject('boss_orb', this);

		this.type = type;
		this.active = false;
		this.shoot = false;
		this.angle = 0;

		this.y += 80;
		this.sprite = this.boss.scene.add.sprite(this.x, this.y, 'boss_orb');
		
		this.sprite.on('animationcomplete', () => {
			this.shoot = true;
			this.finalX = (this.boss.scene.objects.player[0].x-this.x)/15
			this.finalY = (this.boss.scene.objects.player[0].y-this.y)/15
		}, this.scene)
		
		this.container = [];
	}

	addContainer(container){
		this.container.push(container);
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

	chargeAndShoot(){
		this.active = true;
		this.sprite.anims.play('boss_charge_orb');
	}

	fire(){
		this.active = true;
		this.x = Math.floor(this.boss.x + 100*Math.cos(this.angle));
		this.y = Math.floor(this.boss.y + 100*Math.sin(this.angle));
		this.shoot = true;
	}

	updateHitbox(){
		let hitbox = this.hitboxes[0];
		let width, height;

		switch(this.sprite.frame.name){
			case 0: 
				width = 6;
				height = 6;
				break;
			case 1:
				width = 9;
				height = 9;
				break;
			case 2:
				width = 12;
				height = 12;
				break;
			case 3:
				width = 16;
				height = 16;
				break;
			case 4:
				width = 20;
				height = 20;
				break;
			case 5:
				width = 25;
				height = 25;
				break;
		}

		hitbox.x = -width/2;
		hitbox.y = -height/2;
		hitbox.width = width;
		hitbox.height = height;
	}

	update(){
		if ((this.y < 0 ||
			this.y >= this.boss.scene.game.canvas.height ||
			this.x >= this.boss.scene.game.canvas.width ||
			this.x < 0) && this.active){
			this.shoot = false;
			this.active = false;
			this.sprite.setFrame(0);
			for (let i = 0; i < this.container.length; i++){
				this.container[i].reload(this);
			}
		}
		else if (this.shoot){
			if (this.type === 'charged'){
				if (this.sprite.frame.name === 5){
					this.x += this.finalX
					this.y += this.finalY
				} else {
					this.destroy();
				}
			} else if (this.type === 'linear'){
				this.sprite.setFrame(1);
				this.x = Math.floor(this.x + 2.5*Math.cos(this.angle));
				this.y = Math.floor(this.y + 2.5*Math.sin(this.angle));
			} else if (this.type === 'spiral'){				
				this.sprite.setFrame(2);
				this.angle += (this.boss.x % 2 === 0 ? 1 : -1) * 0.01;
				this.x = Math.floor(this.x + 3*Math.cos(this.angle));
				this.y = Math.floor(this.y + 3*Math.sin(this.angle));
			}
		}
		this.updateHitbox();
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.active;
	}
}