const Entity = require('./Entity');

module.exports = class extends Entity{
	constructor(meter = 0, scene){
		/*
			meter: percentage of meter to start with
		*/
		super(30,30);
		this.meterMax = 1000;
		this.meter = Math.min(Math.max(meter/100.0*this.meterMax, 0), this.meterMax) || 0;

		/* TODO implement drawing meter to scene
		this.graphics = this.scene.add.graphics({fillStyle: {color : 0xff0000}});
		let rect = new Phaser.Geom.Rectangle(20,20, 50, 10);
		this.graphics.fillRectShape(rect);
		*/
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
	}
}