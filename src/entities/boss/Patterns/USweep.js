const Pattern = require('./Pattern');

module.exports = class USweep extends Pattern {
	constructor(boss){
		super(boss);
	}

	update(){
		let defaultUpdate = this._update;

		let done = false;
		let step = 0;
		let slowSpeed = 8;
		let fastSpeed = 25;

		let defaultHitbox = this.boss.hitboxes;
		let hitbox = [{
			x: -this.boss.width/2,
			y: -this.boss.height/2,
			width: this.boss.width,
			height: this.boss.height
		}]

		this.boss.hitboxes = hitbox;

		let i = 0;

		return function(){
			if (done){
				this.hitboxes = defaultHitbox;
				this.update = defaultUpdate;
				this.patterns.finish();
				return;
			}
			switch(step){
				case 0: // go up out of screen
					if (this.y > -this.height){
						this.y -= slowSpeed;
					} else {
						this.y = -fastSpeed;
						this.x = this.scene.game.canvas.width - this.width/2;
						step++;
					}
					break;
				case 1: // go down out to bottom of screen
					this.y += fastSpeed;
					if (this.y >= this.scene.game.canvas.height-fastSpeed){
						this.y = this.scene.game.canvas.height - this.height/2;
						step++;
					}
					break;
				case 2: // go left to side of screen
					this.x -= fastSpeed;
					if (this.x <= this.width/2){
						step++;
					}
					this.setRotation(90)
					break;
				case 3: // go up out of screen
					this.y -= fastSpeed;
					if (this.y <= -this.height){
						this.x = this.scene.game.canvas.width/2;
						step++;
					}
					this.setRotation(180)
					break;
				case 4: // ease into 1/4 from the the top of the screen
					if (this.y < this.scene.game.canvas.height/4){
						this.y += slowSpeed;
					} else {
						done = true;
					}
					this.setRotation(0);
					break;
			}
			this.updateSprite();
			this.updateProjectiles();
		}
	}
}