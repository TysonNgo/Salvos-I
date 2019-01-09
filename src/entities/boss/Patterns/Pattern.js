module.exports = class Pattern {
	constructor(boss){
		this.boss = boss;
		this._update = this.boss.update;
	}

	update(){}
	exec(){
		this.boss.update = this.update();
	}
}