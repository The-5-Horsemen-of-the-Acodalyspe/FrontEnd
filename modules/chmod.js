const curl=require('curl');
const su=require('su');
exports.plusx=() => {
	document.querySelector('#samus').classList.add('smashball');
	document.querySelector('#side_b').classList.add('smashball');
};
exports.minusx=() => {
	document.querySelector('#samus').classList.remove('smashball');
	document.querySelector('#side_b').classList.remove('smashball');
};
exports.plusr=async () => {
	exports.plusx();
	exports.minusw();
	document.querySelector('#missile').classList.add('smashball');
	let user=await require('xdotool')();
	try {
		let a=curl('PUT', '/api/user', null, user, {'Authorization': 'jwt '+su.minusq}, true);
		console.log(a);
	} catch(e) {
		console.error(e);
	}
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

