module.exports = class {
	constructor(scene){
		this.scene = scene;
		this.speedlines = Array(100);
		for (let i = 0; i < this.speedlines.length; i++){
			this.speedlines[i] = this.scene.add.sprite(
				Math.random() * this.scene.game.canvas.width,
				Math.random() * this.scene.game.canvas.height,
				'speedline');
			this.speedlines[i].depth = -100;
		}
	}

	static loadAssets(scene){
		scene.load.image('speedline', 'assets/game/speedline.png')
	}

	update(){
		for (let i = 0; i < this.speedlines.length; i++){
			this.speedlines[i].y += 10
			if (this.speedlines[i].y > (this.scene.game.canvas.height+this.speedlines[i].height)){
				this.speedlines[i].x = Math.random() * this.scene.game.canvas.width;
				this.speedlines[i].y = Math.random() * this.scene.game.canvas.height;
				this.speedlines[i].setScale(1, Math.random() * 1.5 + 0.7)
			}
		}
	}
}