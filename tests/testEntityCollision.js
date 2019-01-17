const { expect } = require('chai');
const Entity = require('../src/entities/Entity');


describe('Timer.update()', function() {
	it('collides', function(){
		const a = new Entity(0,0,1,1);
		const b = new Entity(1,1,2,2);
		expect(a.collidesWith(a)).to.be.true;
		expect(a.collidesWith(b)).to.be.true;
		expect(b.collidesWith(a)).to.be.true;

		const c = new Entity(0,0,5,5);
		const d = new Entity(0,4,5,5);
		const d2 = new Entity(0,-4,5,5);
		const d3 = new Entity(4,0,5,5);
		const d4 = new Entity(-4,0,5,5);
		expect(d.collidesWith(c)).to.be.true;
		expect(c.collidesWith(d)).to.be.true;
		expect(d2.collidesWith(c)).to.be.true;
		expect(c.collidesWith(d2)).to.be.true;
		expect(d3.collidesWith(c)).to.be.true;
		expect(c.collidesWith(d3)).to.be.true;
		expect(d4.collidesWith(c)).to.be.true;
		expect(c.collidesWith(d4)).to.be.true;
	})
	it('does not collide', function(){
		const a = new Entity(0,0,1,1);
		const b = new Entity(10,10,1,1);
		const b2 = new Entity(0,1,1,1);
		const b3 = new Entity(1,0,1,1);
		const b4 = new Entity(1,1,1,1);
		expect(a.collidesWith(b)).to.be.false;
		expect(b.collidesWith(a)).to.be.false;
		expect(a.collidesWith(b2)).to.be.false;
		expect(b2.collidesWith(a)).to.be.false;
		expect(a.collidesWith(b3)).to.be.false;
		expect(b3.collidesWith(a)).to.be.false;
		expect(a.collidesWith(b4)).to.be.false;
		expect(b4.collidesWith(a)).to.be.false;

		const c = new Entity(0,0,5,5);
		const d = new Entity(0,5,5,5);
		const d2 = new Entity(0,-5,5,5);
		const d3 = new Entity(5,0,5,5);
		const d4 = new Entity(-5,0,5,5);
		expect(d.collidesWith(c)).to.be.false;
		expect(c.collidesWith(d)).to.be.false;
		expect(d2.collidesWith(c)).to.be.false;
		expect(c.collidesWith(d2)).to.be.false;
		expect(d3.collidesWith(c)).to.be.false;
		expect(c.collidesWith(d3)).to.be.false;
		expect(d4.collidesWith(c)).to.be.false;
		expect(c.collidesWith(d4)).to.be.false;
	})
})
