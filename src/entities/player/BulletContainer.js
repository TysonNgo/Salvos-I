const Bullet = require('./Bullet');

module.exports = class {
	constructor(bullets, player){
		this.bullets = [];
		this.availableBullets = [];
		for (let i = 0; i < bullets; i++){
			let bullet = new Bullet(player);
			bullet.addBulletContainer(this);
			this.bullets.push(bullet);
			this.availableBullets.push(bullet);
		}
	}

	static loadAssets(scene){
		Bullet.loadAssets(scene);
	}

	reload(bullet){
		this.availableBullets.push(bullet);
	}

	fire(){
		if (this.availableBullets.length === 0) return false;
		let bullet = this.availableBullets.pop();
		bullet.fire();
		return true;
	}

	update(){
		for (let i = 0; i < this.bullets.length; i++){
			this.bullets[i].update();
		}
	}
}