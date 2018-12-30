class Key {
	constructor(button, down){
		this.button = button;
		this.down = down;
	}
}

module.exports = class Controller{
	constructor(){
		this.keys = {
			'ArrowUp': new Key('up', false),
			'ArrowDown': new Key('down', false),
			'ArrowLeft': new Key('left', false),
			'ArrowRight': new Key('right', false),
			'x': new Key('shoot', false),
			'z': new Key('shield', false)
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
}