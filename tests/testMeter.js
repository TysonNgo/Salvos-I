const { expect } = require('chai');
const scene = {
	add: {
		sprite: () => ({
			depth: 0
		}),
		graphics: () => ({
			depth: 0,
			fillRect: () => {

			}
		})
	}
}

let Meter = require('../src/entities/Meter')
Meter = class extends Meter{
	constructor(meter = 0){
		super(meter, scene);
	}
}

describe('Test constructor', function() {
	it('default', function() {
		let meter = new Meter();
		expect(meter.meter).to.be.equal(0);
	})

	it('negative meter', function(){
		let meter = new Meter(-14);
		expect(meter.meter).to.be.equal(0);
	})

	it('positive meter', function(){
		let meter = new Meter(10);
		expect(meter.meter/meter.meterMax*100).to.be.equal(10);
	})

	it('exceed max meter', function(){
		let meter = new Meter(101);
		expect(meter.meter/meter.meterMax*100).to.be.equal(100);
	})

	it('number string meter', function(){
		let meter = new Meter('13');
		expect(meter.meter/meter.meterMax*100).to.be.equal(13);
	})

	it('non-number string meter', function(){
		let meter = new Meter('zz');
		expect(meter.meter).to.be.equal(0);
	})
})


describe('Meter.gainMeter(percent)', function() {
	it('0 gain', function() {
		let meter = new Meter();
		meter.gainMeter(0);
		expect(meter.meter).to.be.equal(0);
	})
	it('positive gain', function(){
		let meter = new Meter();
		let max = meter.meterMax;
		meter.gainMeter(1);
		let exp = max * 0.01;
		expect(meter.meter).to.be.equal(exp);

		meter.gainMeter(2.5);
		exp += max * 0.025
		expect(meter.meter).to.be.equal(exp);

		meter.gainMeter(50);
		exp += max * 0.50
		expect(meter.meter).to.be.equal(exp);

		meter.gainMeter(80.5);
		expect(meter.meter).to.be.equal(max);
	})

	it('negative gain', function(){
		let meter = new Meter();
		let max = meter.meterMax;
		meter.gainMeter(-10);
		expect(meter.meter).to.be.equal(0);
		meter.gainMeter(-100);
		expect(meter.meter).to.be.equal(0);

		meter.gainMeter(10);
		let exp = max * 0.10;
		expect(meter.meter).to.be.equal(exp);

		meter.gainMeter(-5);
		exp -= max*0.05;
		expect(meter.meter).to.be.equal(exp);

		meter.gainMeter(-40);
		expect(meter.meter).to.be.equal(0);
	})
})

describe('Meter.useBars(bars)', function() {
	it('use 1 (with sufficient meter)', function() {
		let meter = new Meter(100);
		let meterInitial = meter.meter;
		let bar = meter.meterMax/4.0;
		expect(meter.useBars(1)).to.be.true;
		expect(meter.meter).to.be.equal(meterInitial - bar);
	})

	it('use 1 (with insufficient meter)', function() {
		let meter = new Meter(0);
		let meterInitial = meter.meter;
		expect(meter.useBars(1)).to.be.false;
		expect(meter.meter).to.be.equal(0);
	})

	it('use 2 (with sufficient meter)', function() {
		let meter = new Meter(100);
		let meterInitial = meter.meter;
		let bar = meter.meterMax/4.0*2;
		expect(meter.useBars(2)).to.be.true;
		expect(meter.meter).to.be.equal(meterInitial - bar);
	})

	it('use 2 (with insufficient meter)', function() {
		let meter = new Meter(0);
		let meterInitial = meter.meter;
		expect(meter.useBars(2)).to.be.false;
		expect(meter.meter).to.be.equal(0);
	})

	it('use 3 (with sufficient meter)', function() {
		let meter = new Meter(100);
		let meterInitial = meter.meter;
		let bar = meter.meterMax/4.0*3;
		expect(meter.useBars(3)).to.be.true;
		expect(meter.meter).to.be.equal(meterInitial - bar);
	})

	it('use 3 (with insufficient meter)', function() {
		let meter = new Meter(0);
		let meterInitial = meter.meter;
		expect(meter.useBars(3)).to.be.false;
		expect(meter.meter).to.be.equal(0);
	})

	it('use 4 (with sufficient meter)', function() {
		let meter = new Meter(100);
		let meterInitial = meter.meter;
		let bar = meter.meterMax/4.0*4;
		expect(meter.useBars(4)).to.be.true;
		expect(meter.meter).to.be.equal(meterInitial - bar);
	})

	it('use 4 (with insufficient meter)', function() {
		let meter = new Meter(0);
		let meterInitial = meter.meter;
		expect(meter.useBars(4)).to.be.false;
		expect(meter.meter).to.be.equal(0);
	})

	it('use more than 4 bars', function() {
		let meter = new Meter(100);
		let meterInitial = meter.meter;

		expect(meter.useBars(5)).to.be.false;
		expect(meter.meter).to.be.equal(meterInitial);
		expect(meter.useBars(10)).to.be.false;
		expect(meter.meter).to.be.equal(meterInitial);
		expect(meter.useBars(1000)).to.be.false;
		expect(meter.meter).to.be.equal(meterInitial);
		expect(meter.useBars(100)).to.be.false;
		expect(meter.meter).to.be.equal(meterInitial);
	})

	it('use less than 1 bar', function() {
		let meter = new Meter(100);
		let meterInitial = meter.meter;

		expect(meter.useBars(0)).to.be.false;
		expect(meter.meter).to.be.equal(meterInitial);
		expect(meter.useBars(-1)).to.be.false;
		expect(meter.meter).to.be.equal(meterInitial);
		expect(meter.useBars(-2)).to.be.false;
	})
})
