const { expect } = require('chai');
const Boss = require('../src/entities/boss/Boss');
const Timer = require('../src/entities/Timer');
let scene = {
	addObject: () => {},
	add: {
		sprite: () => ({
			depth: 0,
			play: () => {},
			anims: {
				play: () => {}
			},
			on: () => {}
		}),
		graphics: () => ({
			depth: 0,
			fillRect: () => {

			}
		}),
		text: () => ({
			setText: () => {},
			setOrigin: () => {},
		})
	},
	anims:{
		create: () => {},
		generateFrameNumbers: () => {}
	},
	game: {
		loop: {
			targetFps: 60
		},
		canvas: {
			width: 360
		}
	},
	sound: {
		add: () => ({play: () => {}})
	}
}

function increment30s(timer){
	for (let i = 0; i < scene.game.loop.targetFps*30; i++){
		timer.update();
	}
}

describe('Boss pattern probability', function() {
	it('initial probabilities', function(){
		scene.timer = new Timer(scene);
		const boss = new Boss(scene);
		expect(boss.patterns.p[0]).to.be.equal(1/13);
		expect(boss.patterns.p[1]).to.be.equal(1/13);
		expect(boss.patterns.p[2]).to.be.equal(1/13);
		expect(boss.patterns.p[3]).to.be.equal(1/13);
		expect(boss.patterns.p[4]).to.be.equal(1/13);
		expect(boss.patterns.p[5]).to.be.equal(1/13);
		expect(boss.patterns.p[6]).to.be.equal(1/13);
		expect(boss.patterns.p[7]).to.be.equal(1/13);
		expect(boss.patterns.p[8]).to.be.equal(1/13);
		expect(boss.patterns.p[9]).to.be.equal(1/13);
		expect(boss.patterns.p[10]).to.be.equal(1/13);
		expect(boss.patterns.p[11]).to.be.equal(1/13);
		expect(boss.patterns.p[12]).to.be.equal(1/13);
	})
	it('Boss.Pattern.adjustProbabilities()', function(){
		scene.timer = new Timer(scene);
		const boss = new Boss(scene);
		increment30s(scene.timer);
		boss.patterns.adjustProbabilities();

		expect(boss.patterns.p[0]).to.not.be.equal(1/13);
		expect(boss.patterns.p[1]).to.not.be.equal(1/13);
		expect(boss.patterns.p[2]).to.not.be.equal(1/13);
		expect(boss.patterns.p[3]).to.not.be.equal(1/13);
		expect(boss.patterns.p[4]).to.not.be.equal(1/13);
		expect(boss.patterns.p[5]).to.not.be.equal(1/13);
		expect(boss.patterns.p[6]).to.not.be.equal(1/13);
		expect(boss.patterns.p[7]).to.not.be.equal(1/13);
		expect(boss.patterns.p[8]).to.not.be.equal(1/13);
		expect(boss.patterns.p[9]).to.not.be.equal(1/13);
		expect(boss.patterns.p[10]).to.not.be.equal(1/13);
		expect(boss.patterns.p[11]).to.not.be.equal(1/13);
		expect(boss.patterns.p[12]).to.not.be.equal(1/13);
	})
	it('Probability array equals 1', function(){
		this.timeout(15000);
		scene.timer = new Timer(scene);
		const boss = new Boss(scene);
		for (let i = 0; i < 3000; i++){
			let sum = boss.patterns.p.reduce((a,b) => a+b);
			expect(sum).to.be.closeTo(1, 0.014);
			increment30s(scene.timer);
			boss.patterns.adjustProbabilities();
		}
	})
})
