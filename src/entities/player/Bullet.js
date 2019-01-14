const Entity = require('../Entity');

module.exports = class Bullet extends Entity{
	constructor(player){
		super(player.x+1, player.y-10, 5, 20);
		this.player = player;
		this.player.scene.addObject('player_bullet', this);
		this.speed = 20;
		this.active = false;

		this.sprite = this.player.scene.add.sprite(this.x, this.y, 'player_bullet');
		this.sprite.depth = -1;

		this.bulletContainers = [];
	}

	addBulletContainer(bulletContainer){
		this.bulletContainers.push(bulletContainer);
	}

	static loadAssets(scene){
		scene.load.image('player_bullet', 'assets/game/player/bullet.png');
	}

	unload(){
		this.active = false;
		for (let i = 0; i < this.bulletContainers.length; i++){
			this.bulletContainers[i].reload(this);
		}
	}

	fire(){
		if (!this.active){
			this.x = Math.floor(this.player.x+1);
			this.y = Math.floor(this.player.y-10);
			this.active = true;
		}
	}

	update(){
		if (this.y <= -this.sprite.height && this.active){
			this.unload();
		} 
		if (this.active){
			this.y -= this.speed;
		}
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.active;

		// gain meter when bullet hits boss
		if (this.player.scene.objects.boss &&
			this.collidesWith(this.player.scene.objects.boss[0]) &&
			this.active){
			this.player.scene.objects.boss[0].hit();
			if (this.player.shieldActive){
				this.player.meter.gainMeter(0.3);
			} else {
				this.player.meter.gainMeter(0.8);
			}
			this.unload();
		}
	}
}