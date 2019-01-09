const Pattern = require('./Pattern');
const teleport = require('../projectiles/Teleport');

module.exports = class Teleport extends Pattern {
	constructor(boss){
		super(boss);
		this._update = this.boss.update;
		this.teleport = new teleport(this.boss);
	}

	update(){
		let teleport = this.teleport;
		let defaultUpdate = this._update;
		let i = 0;
		let moveBoss = false;
		let bossReappear = false;
		let done = false;

		this.teleport.active = true;
		this.teleport.sprite.anims.play('boss_teleport_animation')
		this.teleport.sprite.on('animationcomplete', function(animation, frame){
			if (!this.anims._reverse){
				moveBoss = true;
			}
			this.visible = false;
		}, this.teleport.sprite)
		
		return function(){
			if (done){
				this.update = defaultUpdate;
			}

			if (moveBoss){
				this.active = false;
				teleport.active = false;

				// teleport to edge of some set 
				// radius around player
				if (this.scene.objects.player){
					// between 45 and 135 degrees above the x-axis
					let rad = this.random()*(Math.PI-2*Math.PI/4)+Math.PI/4;
					this.x = Math.floor(this.scene.objects.player[0].x + Math.cos(rad)*200);
					this.y = Math.floor(this.scene.objects.player[0].y - Math.sin(rad)*200);
				}

				this.updateSprite();
				moveBoss = false;
				bossReappear = true;
				return;
			}

			if (bossReappear){
				teleport.SFX.play();
				teleport.active = true;
				this.active = true;
				teleport.sprite.anims.playReverse('boss_teleport_animation')
				bossReappear = false;
				done = true;
			}

			teleport.update();
		}
	}

	exec(){
		this.boss.update = this.update();
	}
}