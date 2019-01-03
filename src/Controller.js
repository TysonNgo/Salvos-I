class Key {
	constructor(button, down){
		this.button = button;
		this.down = down;
	}
}

module.exports = class Controller{
	constructor(){
		this.up = new Key('up', false);
		this.down = new Key('down', false);
		this.left = new Key('left', false);
		this.right = new Key('right', false);
		this.shoot = new Key('shoot', false);
		this.shield = new Key('shield', false);
		this.keys = {
			'ArrowUp': this.up,
			'ArrowDown': this.down,
			'ArrowLeft': this.left,
			'ArrowRight': this.right,
			'KeyX': this.shoot,
			'KeyZ': this.shield
		}
	}

	getKey(button){
		if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)){
			button = this[button];
			for (let key in this.keys){
				if (this.keys[key] === button){
					return key;
				}
			}
		}
	}

	changeKey(button, key){
		if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)){
			// if key exists, swap buttons
			// if key does not exist, assign button to key
			//  and delete old button
			let tempKey;
			if (key in this.keys){
				tempKey = this.keys[key];
				if (tempKey.button === button) return false;

				for (let k in this.keys){
					if (this.keys[k].button === button){
						this.keys[key] = this.keys[k];
						this.keys[k] = tempKey;
						return true;
					}
				}
			} else {
				for (let k in this.keys){
					if (this.keys[k].button === button){
						this.keys[key] = this.keys[k];
						delete this.keys[k];
						return true;
					}
				}	
			}
		}
		return false;
	}

	press(key){
		if (key in this.keys){
			this.keys[key].down = true;
		}
	}

	release(key){
		if (key in this.keys){
			this.keys[key].down = false;
		}
	}

	releaseAll(){
		for (let key in this.keys){
			this.keys[key].down = false;
		}
	}

	pressingButton(button=null){
		if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)){
			return this[button].down;
		}
		return Object.values(this.keys).some(k => k.down);
	}
}