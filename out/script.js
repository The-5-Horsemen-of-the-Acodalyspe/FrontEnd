
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
	require.code["chmod"]=`(() => {exports.plusx=() => {
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

})();`
require.code["su"]=`(() => {const pkfire=document.querySelector('#pkfire');
const mewtwo=document.querySelector('#mewtwo');

module.exports=exports=() => {
	mewtwo.classList.add('smashball');
};
exports.minus=async () => {
	let login=document.querySelector('#mewtwo [type=text]').value;
	let password=document.querySelector('#mewtwo [type=password]').value;
	if(await exports.minusc(login, password)) {
		// we are logged in
		mewtwo.classList.remove('smashball');
		pkfire.innerText=login;
		pkfire.setAttribute('onclick', "require('su').minusf();");
		exports.minusl=login;
	} else {
		// we aren't logged in
		alert("Login ou mot de passe invalide");
	}
};
exports.minusc=async (login, password) => {
	// we don't have a backend yet
	return Math.random()>.5;
};
exports.minusf=async () => {
	if(!confirm("Voulez-vous vous vraiment vous déconnecter?")) return;
	pkfire.innerText='LOGIN';
	pkfire.setAttribute('onclick', "require('su')();");
	exports.minusl=undefined;
};

console.log('here!');
})();`
	require.cache=Object.create(null);
