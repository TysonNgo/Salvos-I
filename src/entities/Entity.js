module.exports = class Entity {
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	static loadAssets(scene){}

	collidesWith(entity){
		let widthM1 = this.width/2;
		let heightM1 = this.height/2;
		let widthM2 = entity.width/2;
		let heightM2 = entity.height/2;

		if (this.x - widthM1 < entity.x + widthM2 &&
			this.x + widthM1 > entity.x - widthM2 &&
			this.y - heightM1 < entity.y + heightM2 &&
			this.y + heightM1 > entity.y - heightM2){
			return true;
		}
	}

	update(){}
}