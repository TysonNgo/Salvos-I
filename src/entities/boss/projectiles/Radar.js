const Entity = require('../../Entity');

module.exports = class Radar extends Entity{
	constructor(boss){
		super(boss.x, boss.y, 7, 7);
		this.boss = boss;
		this.boss.scene.addObject('boss_radar', this);

		this.speed = 3;
		this.active = false;
		this.start = false;

		this.graphics = this.boss.scene.add.graphics({lineStyle: {color : 0, width: 7}});
		this.graphics.depth =  -5;
		this.radius = 0;

		this.i = 0;
		this.interval = 60;

		this.container = [];
	}

	addContainer(container){
		this.container.push(container);
	}

	addHitboxes(){}

	changeHitboxes(){
		this.hitboxes.length = 0;
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

	destroy(){
		this.active = false;
		this.graphics.clear();
	}

	update(){
		this.graphics.clear();

		if (this.start){
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
				for (let i = 0; i < this.container.length; i++){
					this.container[i].reload(this);
				}
				this.start = false;
				this.radius = 0;
				this.speed = this.boss.random()*4+1;
				this.i = this.boss.random()*60+60;
				return true;
			}
		}
	}
}