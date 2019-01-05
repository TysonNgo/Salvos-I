const {decorate} = require('../../utils');

module.exports = function(player){
	let i = 0;
	let holdingShoot = 0;
	player.prototype.update = decorate(player.prototype.update, function(){
		if (this.scene.game.controller.pressingButton('shoot')){
			holdingShoot++;
			if (this.scene.game.controller.pressingButton('shield') && holdingShoot <= 3){
				if (i === 0){
					this.dashSFX.play();
				}
				i = (i + 1) % 60;
			} else {
				i = 0;
			}
		} else {
			holdingShoot = 0;
		}
	})
}