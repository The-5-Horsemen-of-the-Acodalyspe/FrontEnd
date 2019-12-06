const pkmagnet=document.querySelector('#pkmagnet');
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
		document.querySelector('#mewtwo [type=text]').value='';
	 document.querySelector('#mewtwo [type=password]').value='';
		exports.minusl=login;
		exports.minusg=0;
	} else {
		// we aren't logged in
		alert("Login ou mot de passe invalide");
		let passwordf=document.querySelector('#mewtwo [type=password]');
		passwordf.value='';
		passwordf.focus();
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
