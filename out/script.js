
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
require.code["su"]=`(() => {const pkmagnet=document.querySelector('#pkmagnet');
const pkfire=document.querySelector('#pkfire');
const mewtwo=document.querySelector('#mewtwo');
const punchingbag=document.querySelector('#punchingbag');
const shadowball=document.querySelector('#shadowball');

const curl=require('curl');

module.exports=exports=() => {
	mewtwo.classList.add('smashball');
	shadowball.focus();
	punchingbag.classList.add('smashball');
	punchingbag.setAttribute('onclick', "require('su').minusm();");
};
exports.minus=async () => {
	let login=document.querySelector('#mewtwo [type=text]').value;
	let password=document.querySelector('#mewtwo [type=password]').value;
	if(await exports.minusc(login, password)) {
		// we are logged in
		mewtwo.classList.remove('smashball');
		pkmagnet.innerText=login;
		pkmagnet.setAttribute('onclick', "require('su').minusf();");
		pkfire.classList.add('smashball');
		punchingbag.classList.remove('smashball');
		exports.minusl=login;
		exports.minusg=0;
	} else {
		// we aren't logged in
		alert("Login ou mot de passe invalide");
		exports.minusg++;
		if(exports.minusg==3) {
			require('sl')();
		}
	}
};
exports.minusc=async (login, password) => {
	try {
		let response=await curl('POST', '/api/auth', null, {username: login, password}, null, true);
		console.log(response);
		exports.minusk=response.access_token;
		return true;
	} catch(e) {
		return false;
	}
};
exports.minusf=async () => {
	if(!confirm("Voulez-vous vous vraiment vous déconnecter?")) return;
	pkmagnet.innerText='LOGIN';
	pkmagnet.setAttribute('onclick', "require('su')();");
	pkfire.classList.remove('smashball');
	exports.minusl=undefined;
};
exports.minusm=async () => {
	punchingbag.classList.remove('smashball');
	mewtwo.classList.remove('smashball');
};
exports.minusg=0;

mewtwo.addEventListener('submit', e => {
	e.preventDefault();
	exports.minus();
});
})();`
require.code["sl"]=`(() => {const never=\`/gonna/give/you/up.mp4\`;
module.exports=exports=function sl() {
	let you=document.createElement('video');
	you.setAttribute('loop', true);
	you.setAttribute('src', never);
	you.style.left='1000vw';
	you.style.position='fixed';
	document.body.appendChild(you);
	try {
		you.requestFullscreen();
		you.play();
	} catch(down) {
		console.error(down);
	}
};

})();`
require.code["curl"]=`(() => {module.exports=exports=function curl(minusX, url, query, minusb, minusH, json) {
	if(!minusH) minusH={};
	if(!query) query={};
	if(!minusb) minusb=null;
	
	let paramStr=Object.keys(query)
		.map(a => encodeURIComponent(a)+'='+encodeURIComponent(query[a]))
		.join('&');
	if(paramStr) url+='?'+paramStr;
	
	return new Promise((ok, ko) => {
		let xhr=new XMLHttpRequest();
		xhr.open(minusX, url, true);
		if(typeof minusb=='object') {
			xhr.setRequestHeader('Content-Type', 'application/json');
			minusb=JSON.stringify(minusb);
		}
		for(let h in minusH) {
			xhr.setRequestHeader(k, minusH[k]);
		}
		xhr.addEventListener('load', () => {
			let fn=xhr.status==200?ok:ko;
			if(json) {
				fn(JSON.parse(xhr.responseText));
			} else {
				fn(xhr.responseText);
			}
		});
		xhr.addEventListener('error', () => {
			ko();
		});
		xhr.send(minusb);
	});
};

})();`
	require.cache=Object.create(null);
