const never=`/gonna/give/you/up.mp4`;
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

