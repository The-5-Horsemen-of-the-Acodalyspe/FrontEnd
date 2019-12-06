function int(a) {
	if(isNaN(+a)) return false;
	if(a%1) return false;
	return true;
}
function float(a) {
	if(isNaN(+a)) return false;
	return true;
}
function string(a) {
	return true;
}
function oneof(arr) {
	return a => arr.includes(a);
}
function maxi(n) {
	return a => int(a) && +a>0 && +a<=n;
}
function yesno(a) {
	return ['yes', 'no', 'true', 'false', 'oui', 'non', ''].includes(a.toLowerCase());
}
yesno.filter=function(a) {
	return ['yes', 'true', 'oui'].includes(a.toLowerCase());
};

let user={
	age: 21
}

const steps=[
	{
		message: `
bienvenu sur etu-en-pls, je suis chatty et je vais vous aider a mettre en place votre compte:
Commençons par votre logement, êtes-vous:
1) chez vos parents
2) en colocation
3) en location
4) et résidence étudiante crous
5) propriétaire
		`,
		input: maxi(5),
		fn: i => user.logement={type: +i}
	}, {
		cond: () => [1, 4, 5].includes(user.logement.type),
		fn: () => user.logement.prix=null
	}, {
		cond: () => ![1, 4, 5].includes(user.logement.type),
		message: `
Quel prix payez vous pour votre (co)location ?
1) moins de 300€
2) entre 300€ et 400€
3) entre 400€ et 500€
4) entre 500€ et 600€
5) plus de 600€
		`,
		input: maxi(5),
		fn: i => user.logement.prix=+i
	}, {
		message: `Sur une échelle de 1 à 5 comment jugeriez l'état et la salubrité de votre logement ?`,
		input: maxi(5),
		fn: i => user.logement['salubrité']=+i>2
	}, {
		message: `
quel est votre moyen de transport ?
1) à pied
2) à vélo
3) vehicule personnel
4) transport en commun
5) train
		`,
		input: maxi(5),
		fn: i => user.logement.transport={type: +i}
	}, {
		message: `Combien de temps mettez vous à arriver à votre université ? (en minute)`,
		input: int,
		fn: i => user.logement.transport.temps=+i
	}, {
		message: `A quelle distance êtes-vous de votre université ? (en km)`,
		input: float,
		fn: i => user.logement.transport.distance=+i
	}, {
		message: `Avez-vous a moins de 3km un moyen de laver votre linge et un supermarché ? O/N`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.logement.transport['accessibilité']=i
	}, {
		message: `
Merci pour ces informations, elle nous aiderons a vous guider vers les aides adéquates.
Maintenant occupons nous de votre bourse:
1) je n'ai pas de bourse
2) je suis sur l'echellon 0bis (1020€)
3) je suis sur l'echellon 1 (1687€)
4) je suis sur l'echellon 2 (2541€)
5) je suis sur l'echellon 3 (3253€)
6) je suis sur l'echellon 4 (3967€)
7) je suis sur l'echellon 5 (4555€)
8) je suis sur l'echellon 6 (4831€)
9) je suis sur l'echellon 7 (5612€)
		`,
		input: maxi(9),
		fn: i => user.finance={bourse: +i}
	}, {
		cond: () => user.age<30 && [2, 3].includes(user.logement.type),
		message: `
Vous avez certains prérequis nécessaires pour toucher des APL, touchez vous:
1) aucune APL
2) moins de 100€ mensuels
3) entre 100€ et 200€ mensuels
4) entre 200€ et 300€ mensuels
5) entre 300€ et 400€ mensuels
6) plus de 400€ mensuels
		`,
		input: maxi(6),
		fn: i => user.finance.APL=+i
	}, {
		message: `
Entrez le montant d'autres aides que vous pouvez toucher par mois:
1) aucune
2) moins de 300€
3) entre 300€ et 400€
4) entre 400€ et 500€
5) entre 500€ et 600€
6) plus de 600€
		`,
		input: maxi(6),
		fn: i => user.finance.autres=+i
	}, {
		message: `
Combien votre famille vous donne-t-elle par moi ?
1) rien
2) moins de 200€
3) entre 200€ et 300€
4) entre 300€ et 400€
5) entre 400€ et 500€
6) entre 500€ et 600€
7) plus de 600€
		`,
		input: maxi(7),
		fn: i => user.finance.famille=+i
	}, {
		message: `Travaillez-vous?`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.finance.travail=i
	}, {
		message: `
Félicitation ! Avec ces infos renseignées vous êtes plus près de la fin de la préparation de votre page personelle.
passons maintenant a ce a quoi vous avez accès.
Avez-vous accès a un ordinateur ? O/N
		`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.techno={ordi: i}
	}, {
		message: `Avez-vous acces à une imprimante ? O/N`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.techno.impr=i
	}, {
		message: `Avez-vous un accès internet personnel ? O/N`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.techno.lolternet=i
	}, {
		message: `
Accès technologiques validés.
Avez-vous un handicap ? O/N
		`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.handi=i
	}, {
		message: `
Pour les 3 questions suivantes vous pouvez laisser vide si vous ne souhaitez pas répondre.
Avez vous eu récemment un décès dans votre entourage ? O/N
		`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.famille={'décès': i}
	}, {
		message: `Vos parents sont-ils divorcés ? O/N`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.famille.divorce=i
	}, {
		message: `Est-ce que vous ou une personne de votre entourage proche est victime de violence ou d'abus ? O/N`,
		input: yesno,
		filter: yesno.filter,
		fn: i => user.famille.violence=i
	}, {
		cond: () => user.logement.type==1,
		fn: () => user.famille.distance=0
	}, {
		cond: () => user.logement.type!=1,
		message: `A quelle distance du domicile familiale habitez-vous ? (en km)`,
		input: float,
		fn: i => user.famille.distance=+i
	}, {
		message: `Quelle est votre niveau post-bac ?`,
		input: int,
		fn: i => user.etude={niveau: +i}
	}, {
		message: `Dans combien d'UE/de matières êtes-vous en difficulté ?`,
		input: int,
		fn: i => user.etude.plsue=+i
	}, {
		message: `Quel formation suivez-vous ?`,
		input: string,
		fn: i => user.etude.forma=i
	}
];

const lucas=document.querySelector('#lucas');
const restText=document.querySelector('#missile [type=text]');
const restButton=document.querySelector('#missile button');

const sendMessage=exports.sendMessage=async text => {
	let pit=document.createElement('div');
	pit.classList.add('pit');
	let img=document.createElement('img');
	img.setAttribute('src', 'assets/images/avatar.png');
	img.style.width='100%';
	pit.appendChild(img);
	let p=document.createElement('p');
	p.innerText=text;
	pit.appendChild(p);
	let arrow=document.createElement('span');
	arrow.classList.add('arrow');
	arrow.innerText=(new Date()).getHours()+':'+(new Date()).getMinutes();
	pit.appendChild(arrow);
	lucas.appendChild(pit);
}
const recvMessage=exports.sendMessage=() => {
	return new Promise((ok, ko) => {
		let fn=(text) => {
			let pit=document.createElement('div');
			pit.classList.add('pit');
			pit.classList.add('dark');
			let img=document.createElement('img');
			img.setAttribute('src', 'assets/images/avatar.png');
			img.style.width='100%';
			pit.appendChild(img);
			let p=document.createElement('p');
			p.innerText=text;
			pit.appendChild(p);
			let arrow=document.createElement('span');
			arrow.classList.add('arrow');
			arrow.innerText=(new Date()).getHours()+':'+(new Date()).getMinutes();
			pit.appendChild(arrow);
			lucas.appendChild(pit);
		};
		restButton.addEventListener('click', async e => {
			let a=restText.value;
			restText.value='';
			fn(a);
			ok(a);
		}, {once: true});
	});
}

module.exports=exports=async function(u={age: 21}) {
	if(module.exports.running) return;
	module.exports.running=true;
	user=u;
	for(let step of steps) {
		if(!step.cond || await step.cond()) {
			if(step.message) await sendMessage(step.message);
			let input;
			if(step.input) {
				while(true) {
					input=await recvMessage();
					if(await step.input(input)) break;
					if(step.message) await sendMessage(step.message);
				}
				if(step.filter) input=await step.filter(input);
			}
			if(step.fn) await step.fn(input);
		}
	}
	module.exports.running=false;
	console.log(user);
	return user;
};

