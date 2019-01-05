const {decorate} = require('../../utils');

module.exports = function(player){
	let holdingShoot = 0;
	let dashActiveInit = 20;
	let dashActive = dashActiveInit;
	let delayInit = 3;
	let delay = delayInit;
	let timers = [];

	let dirBits = 0;
	let up = 0b1000;
	let down = 0b0100;
	let left = 0b0010;
	let right = 0b0001;

	function setAfterImagePosition(img){
		img.x = this.x;
		img.y = this.y;
		img.visible = true;
	}

	player.prototype.update = decorate(player.prototype.update, function(){
		if (this.isDashing){
			// clean up after exiting dash state
			if (dashActive <= 0 ||
				(this.scene.game.controller.pressingButton('shoot') &&
				!this.scene.game.controller.pressingButton('shield'))){
				this.isDashing = false;
				dashActive = dashActiveInit;
			}
			dashActive--;

			if ((dirBits & up) === up){
				this.y -= this.speed*2;
			}
			if ((dirBits & down) === down){
				this.y += this.speed*2;
			}
			if ((dirBits & left) === left){
				this.x -= this.speed*2;
			}
			if ((dirBits & right) === right){
				this.x += this.speed*2;
			}

			// cosmetic dash afterimage effect
			if (delay){
				delay--;
			} else {
				this.spriteAfterImages.forEach((img, i) => {
					let img2;
					if (i === 0){
						img2 = this;
					} else {
						img2 = this.spriteAfterImages[i-1];
					}
					timers.push(this.scene.time.addEvent({
						delay: i*180,
						callback: setAfterImagePosition,
						args: [img],
						callbackScope: img2
					}));
				})
				delay = delayInit;
			}
		} else {
			this.spriteAfterImages.forEach(img => {
				img.visible = false;
			})
		}
		if (this.scene.game.controller.pressingButton('shoot')){
			holdingShoot++;
			if (this.scene.game.controller.pressingButton('shield') && holdingShoot <= 3){
				if (!this.isDashing){
					this.dashSFX.play();
					dirBits = 0;
					dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('up');
					dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('down');
					dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('left');
					dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('right');
					this.isDashing = true;
				}
			}
		} else {
			holdingShoot = 0;
		}
	})
}