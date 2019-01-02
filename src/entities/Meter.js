const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(meter = 0, scene){
		/*
			meter: percentage of meter to start with
		*/
		super(15,13);
		this.meterMax = 1000;
		this.meter = Math.min(Math.max(meter/100.0*this.meterMax, 0), this.meterMax) || 0;

		this.scene = scene;

		// graphics
		this.width = 144;

		let meterBg = this.scene.add.sprite(this.x+69, this.y+12, 'meter', 1);
		meterBg.depth = 99;
		let meterOverlay = this.scene.add.sprite(this.x+69, this.y+12, 'meter', 0);
		meterOverlay.depth = 101;

		this.graphics = this.scene.add.graphics({fillStyle: {color : 0xff0000}});
		this.graphics.depth = 100
		try{
			// Phaser is not imported here, so the
			// tests will fail due to a
			// ReferenceError. When this is ran on
			// client side in the browser, the Phaser
			// library will be imported via <script>
			// tag. Thus, no ReferenceError
			this.rect = new Phaser.Geom.Rectangle(this.x, this.y, 50, 14);
		} catch(e){
			if (!(e instanceof ReferenceError)){
				console.log(e);
			}
		}
		this.graphics.fillRectShape(this.rect);
	}

	static loadAssets(scene){
		scene.load.spritesheet('meter', 'assets/game/player/meter.png', {frameWidth: 151, frameHeight: 23});
	}

	useBars(bars){
		bars = Math.round(bars);
		if (bars > 4 || bars < 1 || bars === NaN) return false;

		let bar = this.meterMax/4.0;
		bars = bar * bars;
		if (this.meter >= bars){
			this.meter -= bars;
			return true;
		}

		return false;
	}

	gainMeter(percent){
		this.meter = Math.min(this.meter += this.meterMax*(percent/100.0), this.meterMax)
		this.meter = Math.max(0, this.meter);
	}

	update(){
		// update graphics
		this.graphics.clear();
		this.rect.width = (this.meter/this.meterMax)*this.width;
		this.graphics.fillRectShape(this.rect);
	}
}