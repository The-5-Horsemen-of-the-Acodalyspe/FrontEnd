exports.plusx=() => {
	document.querySelector('#samus').classList.add('smashball');
	document.querySelector('#side_b').classList.add('smashball');
};
exports.minusx=() => {
	document.querySelector('#samus').classList.remove('smashball');
	document.querySelector('#side_b').classList.remove('smashball');
};
exports.plusr=() => {
	exports.plusx();
	exports.minusw();
	document.querySelector('#missile').classList.add('smashball');
};
exports.minusr=() => {
	document.querySelector('#missile').classList.remove('smashball');
};
exports.plusw=() => {
	exports.plusx();
	exports.minusr();
	document.querySelector('#gun').classList.add('smashball');
};
exports.minusw=() => {
	document.querySelector('#gun').classList.remove('smashball');
};

