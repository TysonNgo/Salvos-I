function decorate(fn, cb){
	return function(){
		fn.apply(this, arguments);
		cb.apply(this, arguments);
	}
}

module.exports = {
	decorate
}