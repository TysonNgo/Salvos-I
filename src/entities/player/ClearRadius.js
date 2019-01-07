const Entity = require('../Entity');

module.exports = class ClearRadius extends Entity{
	constructor(player){
		super(player.x, player.y);
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

	addHitboxes(){
		this.radius = 150;
		let r = this.radius;

		// large inner square
		let w = ((2 * r)**2 / 2) ** 0.5;
		// diameter tall rectangles
		let rw = r/5*4;

		this.hitboxes.push({ // square
			x: -w/2,
			y: -w/2,
			width: w,
			height: w
		}, { // diameter wide
			x: -r,
			y: -rw/2,
			width: 2*r,
			height: rw
		}, { // diameter long
			x: -rw/2,
			y: -r,
			width: rw,
			height: 2*r
		})

		let sq = this.hitboxes[0];
		let rwide = this.hitboxes[1];
		let rlong = this.hitboxes[2];
		this.hitboxes.push({
			x: (sq.x+rwide.x)/2,
			y: (sq.y+rwide.y)/2,
			width: (sq.width+rwide.width)/2,
			height: (sq.height+rwide.height)/2
		}, {
			x: (sq.x+rlong.x)/2,
			y: (sq.y+rlong.y)/2,
			width: (sq.width+rlong.width)/2,
			height: (sq.height+rlong.height)/2
		})
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
					if (this.collidesWith(obj) && this.active){
						// TODO remove enemy projectiles from screen
						obj.destroy();
					}
				})
			}
		}
	}
}