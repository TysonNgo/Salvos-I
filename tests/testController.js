const { expect } = require('chai');
const Timer = require('../src/entities/Timer');

const scene = {
	add: {
		text: () => ({
			setText: () => {},
			setOrigin: () => {},
		})
	},
	game: {
		loop: {
			targetFps: 60
		},
		canvas: {
			width: 360
		}
	}
}


describe('Timer.update()', function() {
	it('check frames after calling update', function(){
		const timer = new Timer(scene);

		expect(timer.frames).to.be.equal(0);
		timer.update();
		expect(timer.frames).to.be.equal(1);
		timer.update();
		expect(timer.frames).to.be.equal(2);
		timer.update();
		expect(timer.frames).to.be.equal(3);

		timer.stop();

		timer.update();
		expect(timer.frames).to.be.equal(3);
	})
})


describe('Timer.getHHMMSS(frames)', function() {
	it('invalid frames parameter', function(){
		const timer = new Timer(scene);

		expect(timer.getHHMMSS('cacwasfawasfg')).to.be.equal(null);
		expect(timer.getHHMMSS([])).to.be.equal(null);
		expect(timer.getHHMMSS({})).to.be.equal(null);
		expect(timer.getHHMMSS(0.015641)).to.be.equal(null);
	})
	it('undefined frames parameter', function(){
		const timer = new Timer(scene);
		let hms = function(h, m, s, mm){
			this.h = h;
			this.m = m;
			this.s = s;
			this.mm = '.'+mm;
		}
		expect(timer.getHHMMSS()).to.deep.equal(new hms('00','00','00','00'));
		for (let i = 0; i < 60; i++) {
			timer.update();
		}
		expect(timer.getHHMMSS()).to.deep.equal(new hms('00','00','01','00'));
		for (let i = 0; i < 120; i++) {
			timer.update();
		}
		expect(timer.getHHMMSS()).to.deep.equal(new hms('00','00','03','00'));
	})
	it('test milliseconds', function(){
		const timer = new Timer(scene);
		let hms = function(h, m, s, mm){
			this.h = h;
			this.m = m;
			this.s = s;
			this.mm = '.'+mm;
		}
		expect(timer.getHHMMSS(1)).to.deep.equal(new hms('00','00','00','02'));
		expect(timer.getHHMMSS(2)).to.deep.equal(new hms('00','00','00','03'));
		expect(timer.getHHMMSS(15)).to.deep.equal(new hms('00','00','00','25'));
		expect(timer.getHHMMSS(55)).to.deep.equal(new hms('00','00','00','92'));
	})
	it('test seconds', function(){
		const timer = new Timer(scene);
		let hms = function(h, m, s, mm){
			this.h = h;
			this.m = m;
			this.s = s;
			this.mm = '.'+mm;
		}
		expect(timer.getHHMMSS(60)).to.deep.equal(new hms('00','00','01','00'));
		expect(timer.getHHMMSS(60*2)).to.deep.equal(new hms('00','00','02','00'));
		expect(timer.getHHMMSS(60*10)).to.deep.equal(new hms('00','00','10','00'));
		expect(timer.getHHMMSS(60*24)).to.deep.equal(new hms('00','00','24','00'));
	})
	it('test minutes', function(){
		const timer = new Timer(scene);
		let hms = function(h, m, s, mm){
			this.h = h;
			this.m = m;
			this.s = s;
			this.mm = '.'+mm;
		}
		expect(timer.getHHMMSS(60*60)).to.deep.equal(new hms('00','01','00','00'));
		expect(timer.getHHMMSS(60*60*2)).to.deep.equal(new hms('00','02','00','00'));
		expect(timer.getHHMMSS(60*60*10)).to.deep.equal(new hms('00','10','00','00'));
		expect(timer.getHHMMSS(60*60*24)).to.deep.equal(new hms('00','24','00','00'));
	})
	it('test hours', function(){
		const timer = new Timer(scene);
		let hms = function(h, m, s, mm){
			this.h = h;
			this.m = m;
			this.s = s;
			this.mm = '.'+mm;
		}
		expect(timer.getHHMMSS(60*60*60)).to.deep.equal(new hms('01','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*2)).to.deep.equal(new hms('02','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*10)).to.deep.equal(new hms('10','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*23)).to.deep.equal(new hms('23','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*24)).to.deep.equal(new hms('24','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*25)).to.deep.equal(new hms('25','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*100)).to.deep.equal(new hms('100','00','00','00'));
		expect(timer.getHHMMSS(60*60*60*1000)).to.deep.equal(new hms('1000','00','00','00'));
	})
})