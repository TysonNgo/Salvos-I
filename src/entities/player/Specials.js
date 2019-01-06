const {decorate} = require('../../utils');

module.exports = function(player){
	let inputBuffer = [];
	let inputBufferMax = 28;

	function is360(){
		/*
			O(n^2);
			could probably make this O(n)
		*/
		for (let i = 0; i < inputBuffer.length; i++){
			if (is360Helper(inputBuffer.slice(i))) return true;
		}
		return false;
	}

	function is360Helper(inputBuffer){
		let dirs = [0b1000, 0b0001, 0b0100, 0b0010]; // up right down left
		let clockwise = true;
		let index = 0;
		let buffer = 0;
		let bufferMax = 7;
		let step = 0;

		for (const i of inputBuffer){
			if (buffer >= bufferMax) return false;
			if (step >= dirs.length) return true;
			if (~dirs.indexOf(i) && step === 0){
				buffer = 0;
				index = dirs.indexOf(i);
				step++;
				continue;
			} else if (step === 1){
				let next = (index + 1) % dirs.length;
				let prev = (dirs.length + index - 1) % dirs.length;
				if (i === dirs[next]){
					buffer = 0;
					index = next;
					step++;
					continue;
				} else if (i === dirs[prev]){
					buffer = 0;
					clockwise = false;
					index = prev;
					step++;
					continue;
				}
			} else if (step === 2 || step === 3){
				let next;
				if (clockwise){
					next = (index + 1) % dirs.length;
				} else {
					next = (dirs.length + index - 1) % dirs.length;
				}
				if (i === dirs[next]){
					buffer = 0;
					index = next;
					step++;
					continue;
				}
			}
			buffer++;
		}
		return false;
	}

	player.prototype.update = decorate(player.prototype.update, function(){
		let dirBits = 0;
		dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('up');
		dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('down');
		dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('left');
		dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('right');
		inputBuffer.push(dirBits);
		if (inputBuffer.length > inputBufferMax){
			inputBuffer.splice(0, 1);
		}

		if (this.scene.game.controller.pressingButton('shoot')){
			if (is360() && this.meter.useBars(4)){
				this.special.use();
			}
			inputBuffer.length = 0;
		}
	})
}