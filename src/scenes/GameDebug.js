const { decorate } = require('../utils');

module.exports = function(GameScene){
	GameScene.prototype.create = decorate(GameScene.prototype.create, function(){
		this.input.keyboard.on('keydown', e => {
			if (e.code === 'Backquote'){
				this.player.removeAnimations();
				this.boss.removeAnimations();
				this.destroyObjects();
				this.scene.start('MainMenu');
			}
		})

		this.debugFps = this.add.text(10, this.game.canvas.height-30,`${this.game.loop.actualFps.toFixed(1)} fps`,
		{fontFamily: 'Kong Text', fill: '#000', backgroundColor: '#fff'})
		this.debugFps.depth = 1000;
		this.debugHitbox = this.add.graphics({lineStyle: {color : 0xff0000}});
		this.debugHitbox.depth = 1000;
	})

	GameScene.prototype.update = decorate(GameScene.prototype.update, function(){
		this.debugHitbox.clear();
		for (let k in this.objects){
			this.objects[k].forEach(o => {
				if (!o.height && o.active){
					this.debugHitbox.lineStyle(1, 0x006600)
					this.debugHitbox.strokeCircle(o.x, o.y, o.radius);
				}
				o.hitboxes.forEach(h => {
					if (o.active){
						this.debugHitbox.lineStyle(1, 0xff0000)
						this.debugHitbox.strokeRect(o.x+h.x, o.y+h.y, h.width, h.height);
					}
				})
			})
		}

		this.debugFps.setText(this.game.loop.actualFps.toFixed(1))
	})
}