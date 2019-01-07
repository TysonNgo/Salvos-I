module.exports = class Entity {
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.active = true;
		this.hitboxes = [];
		this.addHitboxes();
	}

	static loadAssets(scene){}

	addHitboxes(){
		// x, y relative to the entity's center
		this.hitboxes.push({
			x: -this.width/2,
			y: -this.height/2,
			width: this.width,
			height: this.height
		})
	}

	collidesWith(entity){
		let hitboxes1 = this.hitboxes;
		let hitboxes2 = entity.hitboxes;
		let r = false;

		hitboxes1.forEach(h1 => {
			hitboxes2.forEach(h2 => {
				let x1 = this.x+h1.x;
				let y1 = this.y+h1.y;
				let x2 = entity.x+h2.x;
				let y2 = entity.y+h2.y;

				if ((x1 < x2 + h2.width &&
					x1 + h1.width > x2 &&
					y1 < y2 + h2.height &&
					y1 + h1.height > y2)){
					r = true;
				}
			})
		})
		return r;
	}

	update(){}
}