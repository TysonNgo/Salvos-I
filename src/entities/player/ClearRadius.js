const Entity = require('../Entity');

module.exports = class ClearRadius extends Entity{
	constructor(player){
		super(player.x, player.y, 150);
		this.player = player;
		this.player.scene.addObject('player_special', this);
		this.active = false;

		this.createAnimations();
		this.sprite = this.player.scene.add.sprite(this.x, this.y, 'player_special');
		this.sprite.play('player_special');
		this.sprite.on('animationcomplete', () => {
			this.active = false;
		})
		this.sprite.depth = 50;
	}

	static loadAssets(scene){
		scene.load.spritesheet('player_special', 'assets/game/player/special.png', {frameWidth: 300, frameHeight: 300});
	}

	createAnimations(){
		this.player.scene.anims.create({
			key: 'player_special',
			frames: this.player.scene.anims.generateFrameNumbers('player_special', {start: 0, end: 6}),
			frameRate: 8
		});
	}

	removeAnimations(){
		this.player.scene.anims.remove('player_special');
	}

	use(){
		this.player.specialSFX.play();
		this.x = this.player.x;
		this.y = this.player.y;
		this.active = true;
		this.sprite.play('player_special');
	}

	update(){
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.active;

		for (let key in this.player.scene.objects){
			if (key.startsWith('boss_')){
				this.player.scene.objects[key].forEach(obj => {
					if (this.collidesWith(obj)){
						console.log(key)
					}
				})
			}
		}
	}
}