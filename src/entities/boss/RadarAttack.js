const Entity = require('../Entity');

module.exports = class Radar extends Entity{
	constructor(boss){
		super(boss.x, boss.y, 7, 7);
		this.boss = boss;
		this.boss.scene.addObject('boss_radar', this);

		this.speed = 3;
		this.active = false;

		this.graphics = this.boss.scene.add.graphics({lineStyle: {color : 0, width: 7}});
		this.graphics.depth =  -5;
		this.radius = 0;
		this.graphics.strokeCircle(this.x, this.y, 100);

		this.i = 0;
		this.interval = 60;
	}

	addHitboxes(){}

	changeHitboxes(){
		this.hitboxes.length = 0;
		if (!this.active) return;
		let r = this.radius;
		let pi = Math.PI;
		let numHitboxes = Math.round(((pi*(r+this.width))**2 - (pi*r)**2))/(this.width*this.height*4);
		let radPerHitbox = pi/numHitboxes*2;

		for (let i = 0; i < numHitboxes; i++){
			let x = -(this.radius*Math.cos(radPerHitbox*i)+(this.width/2));
			let y = -(this.radius*Math.sin(radPerHitbox*i)+(this.width/2));

			if (this.x+x >= 0 && this.x+x <= this.boss.scene.game.canvas.width &&
				this.y+y >= 0 && this.y+y <= this.boss.scene.game.canvas.height){
				this.hitboxes.push({
					x: x,
					y: y,
					width: this.width,
					height: this.height
				})
			}
		}
	}

	update(){
		this.graphics.clear();
		this.changeHitboxes();
		this.graphics.strokeCircle(this.x, this.y, this.radius);

		let alpha = this.i % this.interval / this.interval;
		if (alpha >= 0.6){
			this.active = true;
			this.graphics.alpha = 1;
		} else {
			this.active = false;
			this.graphics.alpha = 0.2;
		}
		this.i++;
		this.changeHitboxes();
		if (this.radius <= 700){
			this.radius += this.speed;
		} else {
			this.radius = 0;
			this.speed = Math.random()*4+1;
			this.i = Math.random()*60+60;
		}
	}
}