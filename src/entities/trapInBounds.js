const {decorate} = require('../utils');

module.exports = function(entity){
	entity.prototype.update = decorate(entity.prototype.update, function(){
		let w = Math.round(this.width/2);
		let h = Math.round(this.height/2);
		if (this.x < w){
			this.x = w;
		} else if (this.x > this.scene.game.canvas.width-w){
			this.x = this.scene.game.canvas.width-w;
		}

		if (this.y < h){
			this.y = h;
		} else if (this.y > this.scene.game.canvas.height-h){
			this.y = this.scene.game.canvas.height-h;
		}

		this.sprite.x = this.x;
		this.sprite.y = this.y;
	})
}