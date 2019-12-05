
	const require=function require(name) {
		if(require.cache[name]) return require.cache[name].exports;
		let code=require.code[name];
		if(!code) throw new Error("Module "+name+" not found");
		let fn=new Function('module', 'exports', code);
		let module={
			exports: {},
			name: name
		};
		fn(module, module.exports);
		require.cache[name]=module;
		return module.exports;
	};
	require.code=Object.create(null);
	require.code["chmod"]=`exports.plusx=() => {
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

`
	require.cache=Object.create(null);
