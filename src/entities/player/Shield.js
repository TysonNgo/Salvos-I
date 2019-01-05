const {decorate} = require('../../utils');

module.exports = function(player){
	let i = 0;
	player.prototype.update = decorate(player.prototype.update, function(){
		if (this.scene.game.controller.pressingButton('shield') &&
			!this.scene.game.controller.pressingButton('shoot')){
			if (i === 0){
				this.shieldSFX.play();
			}
			i = (i + 1) % 60;
		} else {
			i = 0;
		}
	})
}