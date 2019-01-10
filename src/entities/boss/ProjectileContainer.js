module.exports = class ProjectileContainer {
	constructor(boss, projectile, n){
		this.projectiles = [];
		this.availableProjectiles = [];
		for (let i = 0; i < n; i++){
			let p = new projectile(boss);
			p.addContainer(this);
			this.projectiles.push(p);
			this.availableProjectiles.push(p);
		}
	}

	get(){
		if (this.availableProjectiles.length === 0) return false;
		return this.availableProjectiles.pop();
	}

	reload(projectile){
		this.availableProjectiles.push(projectile);
	}

	forEach(cb){
		return this.projectiles.forEach(cb);
	}
}