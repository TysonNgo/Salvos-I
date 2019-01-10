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

	get(n=0){
		if (this.availableProjectiles.length === 0) return false;
		if (n === 0) return this.availableProjectiles.pop();

		if (this.availableProjectiles.length % n !== 0) return false;
		let result = [];
		for (let i = 0; i < n; i++){
			result.push(this.availableProjectiles.pop());
		}
		return result;
	}

	reload(projectile){
		this.availableProjectiles.push(projectile);
	}

	forEach(cb){
		return this.projectiles.forEach(cb);
	}
}