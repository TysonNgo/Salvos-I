module.exports = class Timer {
	constructor(scene){
		this.scene = scene;
		this.frames = 0;
		this._stop = false;

		this.text = this.scene.add.text(this.scene.game.canvas.width-41, 30, '',
		{fontFamily: 'Kong Text', fill: '#000', backgroundColor: 'rgba(255,255,255,0.5)'})
		this.text.setOrigin(1);
		this.text.depth = 1000;

		this.textMM = this.scene.add.text(this.scene.game.canvas.width-5, 30, '.00',
		{fontFamily: 'Kong Text', fill: '#000', fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.5)'})
		this.textMM.setOrigin(1);
		this.textMM.depth = 1000;
	}

	getHHMMSS(frames){
		frames = frames || this.frames;
		let s = frames/this.scene.game.loop.targetFps;
		let m = s/60;
		s %= 60;
		let mm = (s-Math.floor(s)).toFixed(2).substr(1);
		s = Math.floor(s);
		let h = Math.floor(m/60);
		m = Math.floor(m % 60);

		return {
			h: ('00'+h).slice(-2),
			m: ('00'+m).slice(-2),
			s: ('00'+s).slice(-2),
			mm: mm
		}
	}

	stop(){
		this._stop = true;
		this.text.alpha = 0.3
		this.textMM.alpha = 0.3
	}

	update(){
		if (!this._stop){
			this.frames++;
			let {h, m, s, mm} = this.getHHMMSS()
			this.text.setText(`${h}:${m}:${s}`)
			this.textMM.setText(mm)
		}
	}
}