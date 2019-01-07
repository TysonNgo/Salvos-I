const Entity = require('../Entity');

module.exports = class Bullet extends Entity{
	constructor(player){
		super(player.x+1, player.y-10, 5, 20);
		this.player = player;
		this.player.scene.addObject('player_bullet', this);
		this.speed = 20;
		this.fired = false;

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
		this.fired = false;
		for (let i = 0; i < this.bulletContainers.length; i++){
			this.bulletContainers[i].reload(this);
		}
	}

	fire(){
		if (!this.fired){
			this.x = this.player.x+1;
			this.y = this.player.y-10;
			this.fired = true;
		}
	}

	update(){
		if (this.y <= -this.sprite.height && this.fired){
			this.unload();
		} 
		if (this.fired){
			this.y -= this.speed;
		}
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.fired;

		// gain meter when bullet hits boss
		if (this.collidesWith(this.player.scene.objects.boss[0]) && this.fired){
			this.player.scene.objects.boss[0].hit();
			this.player.meter.gainMeter(25);
			this.unload();
		}
	}
}