const {decorate} = require('../../utils');

module.exports = function(player){
	player.prototype.shieldActive = false;
	let shieldTimer = 0;
	let shieldTimerT = 120;
	let i = 0;

	player.prototype.update = decorate(player.prototype.update, function(){
		if (this.scene.game.controller.pressingButton('shield') &&
			!this.scene.game.controller.pressingButton('shoot')){
			if (i === 0 && this.meter.useBars(1)){
				this.shieldSFX.play();
				this.spriteShield.visible = true;
				this.shieldActive = true;
				shieldTimer += shieldTimerT;
			}
			i = (i + 1) % 60;
		} else {
			i = 0;
		}

		if (this.shieldActive && shieldTimer > 0){
			if (shieldTimer <= 10){
				if (shieldTimer % 2 === 0){
					this.spriteShield.visible = false;
				} else {
					this.spriteShield.visible = true;
				}
			} else if (shieldTimer <= 60){
				if (shieldTimer % 5 === 0){
					this.spriteShield.visible = false;
				} else {
					this.spriteShield.visible = true;
				}
			}
			shieldTimer--;
		} else {
			this.shieldActive = false;
			this.spriteShield.visible = false;
		}
		this.spriteShield.x = this.x;
		this.spriteShield.y = this.y;
	})
}