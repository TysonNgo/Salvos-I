const { decorate } = require('../utils');
const Player = require('../entities/player/Player');

window.debug = {
	showHitboxes: true,
	showFPS: true,
	infiniteMeter: true,
	invincible: true,
	_playerHit: Player.prototype.hit
}

// html menu to toggle various flags
let debugForm = document.createElement('form');
debugForm.id = 'debugForm'
debugForm.innerHTML = '';
debugForm.style.position = 'fixed'
debugForm.style.background = 'rgba(255,255,255,0.85)'
for (let k in window.debug){
	if (k.startsWith('_')) continue;
	debugForm.innerHTML += `
	<label style='display:block'>
		<input id='${k}' type='checkbox' ${window.debug[k]? 'checked': ''}
		onclick = '(function(e){window.debug[e.id] = e.checked})(this)' />
	${k}<label>`
}
document.body.appendChild(debugForm);

module.exports = function(GameScene){

	GameScene.prototype.create = decorate(GameScene.prototype.create, function(){
		window.debug._boss = this.boss;
		debugForm.innerHTML += '<h5>BOSS PATTERNS</h5>'
		this.boss.patterns.patterns.forEach((p, i) => {
			debugForm.innerHTML += `
				<div id=${i} onclick=(function(e){window.debug._boss.patterns.patterns[e.id].exec()})(this)>${window.debug._boss.patterns.patterns[i].constructor.name}</div>
			`
		})
		this.input.keyboard.on('keydown', e => {
			if (e.code === 'Backquote'){
				this.player.removeAnimations();
				this.boss.removeAnimations();
				this.destroyObjects();
				this.scene.start('MainMenu');
			}
		})

		this.debugFps = this.add.text(10, this.game.canvas.height-30,'',
		{fontFamily: 'Kong Text', fill: '#000', backgroundColor: '#fff'})
		this.debugFps.depth = 1000;
		this.debugHitbox = this.add.graphics({lineStyle: {color : 0xff0000}});
		this.debugHitbox.depth = 1000;
	})

	GameScene.prototype.update = decorate(GameScene.prototype.update, function(){
		this.debugHitbox.clear();
		if (window.debug.showHitboxes){
			for (let k in this.objects){
				this.objects[k].forEach(o => {
					if (!o.height && o.active){
						this.debugHitbox.lineStyle(1, 0x006600)
						this.debugHitbox.strokeCircle(o.x, o.y, o.radius);
					}
					o.hitboxes.forEach(h => {
						if (o.active){
							this.debugHitbox.lineStyle(1, 0xff0000)
							this.debugHitbox.strokeRect(o.x+h.x, o.y+h.y, h.width, h.height);
						}
					})
				})
			}
		}

		if (window.debug.showFPS){
			this.debugFps.setText(this.game.loop.actualFps.toFixed(1))
		} else {
			this.debugFps.setText('');
		}

		if (window.debug.infiniteMeter){
			this.player.meter.gainMeter(100)
		}

		if (window.debug.invincible){
			this.player.hit = function(){};
		} else {
			this.player.hit = window.debug._playerHit;
		}
	})
}