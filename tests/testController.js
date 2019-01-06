const { expect } = require('chai');
const Controller = require('../src/Controller');

describe('Controller.changeKey(button, key)\n' +
'    button - one of [up, down, left, right, shoot, shield]\n' +
'    key - Phaser 3 keyboard event key code string', function() {
	it('[button, key] identical to initial state; no change', function() {
		let initialCon = new Controller();
		let controller = new Controller();
		controller.changeKey('up', 'ArrowUp');
		controller.changeKey('down', 'ArrowDown');
		controller.changeKey('left', 'ArrowLeft');
		controller.changeKey('right', 'ArrowRight');
		controller.changeKey('shoot', 'KeyX');
		controller.changeKey('shield', 'KeyZ');

		for (let k in initialCon.keys){
			expect(initialCon.keys[k].button).to.be.a('string', controller.keys[k].button);
		}
	})

	it('[different button, existing key]; swap button of keys', function(){
		let controller = new Controller();
		let keyZ = controller.keys['KeyZ'];
		let keyX = controller.keys['KeyX'];
		controller.changeKey('shoot', 'KeyZ');

		expect(keyZ.button).to.be.a('string', controller.keys['KeyX'].button);
		expect(keyX.button).to.be.a('string', controller.keys['KeyZ'].button);
	})

	it('invalid button given', function(){
		let controller = new Controller();
		expect(controller.changeKey('what', 'KeyX')).to.be.false;
	})

	it('change key to unique button', function(){
		let controller = new Controller();
		expect(Object.keys(controller.keys).length).to.equal(6);
		controller.changeKey('up', 'w');
		expect(Object.keys(controller.keys).length).to.equal(6);
	})
})

describe('Controller.press(key)\n' +
'    key - Phaser 3 keyboard event key code string', function() {
	it('press valid key', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.false;
		expect(keys.ArrowLeft.down).to.be.false;
		expect(keys.ArrowRight.down).to.be.false;
		expect(keys.KeyX.down).to.be.false;
		expect(keys.KeyZ.down).to.be.false;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('press invalid key', function(){
		let controller = new Controller();
		controller.press('q');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.false;
		expect(keys.ArrowLeft.down).to.be.false;
		expect(keys.ArrowRight.down).to.be.false;
		expect(keys.KeyX.down).to.be.false;
		expect(keys.KeyZ.down).to.be.false;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('press key that is already pressed', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowUp');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.false;
		expect(keys.ArrowLeft.down).to.be.false;
		expect(keys.ArrowRight.down).to.be.false;
		expect(keys.KeyX.down).to.be.false;
		expect(keys.KeyZ.down).to.be.false;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
})

describe('Controller.release(key)\n' +
'    key - Phaser 3 keyboard event key code string', function() {
	it('release valid key', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowDown');
		controller.press('ArrowLeft');
		controller.press('ArrowRight');
		controller.press('KeyX');
		controller.press('KeyZ');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('ArrowUp');
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('release invalid key', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowDown');
		controller.press('ArrowLeft');
		controller.press('ArrowRight');
		controller.press('KeyX');
		controller.press('KeyZ');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('q');
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('release key that is already released', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowDown');
		controller.press('ArrowLeft');
		controller.press('ArrowRight');
		controller.press('KeyX');
		controller.press('KeyZ');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('ArrowUp');
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('ArrowUp');
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.KeyX.down).to.be.true;
		expect(keys.KeyZ.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
})


describe('Controller.pressingButton(button)\n' +
'    button - one of [up, down, left, right, shoot, shield]', function() {
	it('empty param; check if pressing any button', function(){
		let controller = new Controller();
		let expectButton = function(key){
			controller.press(key);
			expect(controller.pressingButton()).to.be.true;
			controller.release(key);
			expect(controller.pressingButton()).to.be.false;
		}
		expect(controller.pressingButton()).to.be.false;

		expectButton('ArrowUp');
		expectButton('ArrowDown');
		expectButton('ArrowLeft');
		expectButton('ArrowRight');
		expectButton('KeyX');
		expectButton('KeyZ');
	})
	it('check pressing specific button', function(){
		let controller = new Controller();
		let expectButton = function(key, button){
			let options = ['up', 'down', 'left', 'right', 'shoot', 'shield'];
			controller.press(key);
			options.forEach(o => {
				if (o === button){
					expect(controller.pressingButton(o)).to.be.true;
				} else {
					expect(controller.pressingButton(o)).to.be.false;
				}
			})
			controller.release(key);
			
			options.forEach(o => {
				expect(controller.pressingButton(o)).to.be.false;
			})
		}
		expectButton('ArrowUp', 'up');
		expectButton('ArrowDown', 'down');
		expectButton('ArrowLeft', 'left');
		expectButton('ArrowRight', 'right');
		expectButton('KeyX', 'shoot');
		expectButton('KeyZ', 'shield');
	})
})


describe('Controller.holdingButton(button)\n' +
'    button - one of [up, down, left, right, shoot, shield]', function() {
	it('empty param; check if pressing any button', function(){
		let controller = new Controller();
		let expectButton = function(key){
			controller.press(key);
			expect(controller.pressingButton()).to.be.true;
			controller.release(key);
			expect(controller.pressingButton()).to.be.false;
		}
		expect(controller.pressingButton()).to.be.false;

		expectButton('ArrowUp');
		expectButton('ArrowDown');
		expectButton('ArrowLeft');
		expectButton('ArrowRight');
		expectButton('KeyX');
		expectButton('KeyZ');
	})
	it('check pressing specific button', function(){
		let controller = new Controller();
		let expectButton = function(key, button){
			let options = ['up', 'down', 'left', 'right', 'shoot', 'shield'];
			controller.press(key);
			options.forEach(o => {
				if (o === button){
					expect(controller.pressingButton(o)).to.be.true;
				} else {
					expect(controller.pressingButton(o)).to.be.false;
				}
			})
			controller.release(key);
			
			options.forEach(o => {
				expect(controller.pressingButton(o)).to.be.false;
			})
		}
		expectButton('ArrowUp', 'up');
		expectButton('ArrowDown', 'down');
		expectButton('ArrowLeft', 'left');
		expectButton('ArrowRight', 'right');
		expectButton('KeyX', 'shoot');
		expectButton('KeyZ', 'shield');
	})
})


describe('Controller.getKey(button)\n' +
'    button - one of [up, down, left, right, shoot, shield]', function() {
	it('valid button', function(){
		let controller = new Controller();
		
		expect(controller.getKey('up')).to.be.equal('ArrowUp');
		expect(controller.getKey('down')).to.be.equal('ArrowDown');
		expect(controller.getKey('left')).to.be.equal('ArrowLeft');
		expect(controller.getKey('right')).to.be.equal('ArrowRight');
		expect(controller.getKey('shoot')).to.be.equal('KeyX');
		expect(controller.getKey('shield')).to.be.equal('KeyZ');
	})

	it('invalid button', function(){
		let controller = new Controller();
		
		expect(controller.getKey('zzz')).to.be.equal(undefined);
	})
})