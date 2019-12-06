const pkfire=document.querySelector('#pkfire');
const mewtwo=document.querySelector('#mewtwo');
const punchingbag=document.querySelector('#punchingbag');

const curl=require('curl');

module.exports=exports=() => {
	mewtwo.classList.add('smashball');
	punchingbag.classList.add('smashball');
	punchingbag.setAttribute('onclick', "require('su').minusm();");
};
exports.minus=async () => {
	let login=document.querySelector('#mewtwo [type=text]').value;
	let password=document.querySelector('#mewtwo [type=password]').value;
	if(await exports.minusc(login, password)) {
		// we are logged in
		mewtwo.classList.remove('smashball');
		pkfire.innerText=login;
		pkfire.setAttribute('onclick', "require('su').minusf();");
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
	pkfire.innerText='LOGIN';
	pkfire.setAttribute('onclick', "require('su')();");
	exports.minusl=undefined;
};
exports.minusm=async () => {
	punchingbag.classList.remove('smashball');
	mewtwo.classList.remove('smashball');
};
exports.minusg=0;

console.log('here!');
