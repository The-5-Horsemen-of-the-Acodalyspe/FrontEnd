const pkfire=document.querySelector('#pkfire');
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
