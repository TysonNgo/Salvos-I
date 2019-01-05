const {decorate} = require('../../utils');

module.exports = function(player){
	let i = 0;
	player.prototype.update = decorate(player.prototype.update, function(){
		if (this.scene.game.controller.pressingButton('shoot') &&
			!this.scene.game.controller.pressingButton('shield')){
			if (i === 0){
				if (this.bullets.fire()){
					this.shootSFX.play();
					this.meter.gainMeter(5);
				}
			}
			i = (i + 1) % 10;
		} else {
			i = 0;
		}
	})
}