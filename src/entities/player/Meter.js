const Entity = require('../Entity');

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
		this.barWidth = 144;

		let meterBg = this.scene.add.sprite(this.x+69, this.y+12, 'meter', 1);
		meterBg.depth = 99;
		let meterOverlay = this.scene.add.sprite(this.x+69, this.y+12, 'meter', 0);
		meterOverlay.depth = 101;

		this.graphics = this.scene.add.graphics({fillStyle: {color : this.getMeterColor()}});
		this.graphics.depth = 100;

		this.meterBarHeight = 14;
		this.graphics.fillRect(this.x, this.y, (this.meter/this.meterMax)*this.barWidth, this.meterBarHeight);
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

	getMeterColor(){
		let meterPercent = this.meter/this.meterMax;
		if (meterPercent >= 1.0){
			return 0xeadf00; // yellow
		} else if (meterPercent >= 0.75){
			return 0xe00000; // red
		} else if (meterPercent >= 0.50){
			return 0xff6600; // orange
		} else if (meterPercent >= 0.25){
			return 0x00c000; // green
		} else {
			return 0x4c4ccc; // blue
		}
	}

	update(){
		// update graphics
		this.graphics.clear();
		this.graphics.fillStyle(this.getMeterColor())
		this.graphics.fillRect(this.x, this.y, (this.meter/this.meterMax)*this.barWidth, this.meterBarHeight);
	}
}