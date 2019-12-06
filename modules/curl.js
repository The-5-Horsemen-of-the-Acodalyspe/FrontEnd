module.exports=exports=function curl(minusX, url, query, minusb, minusH, json) {
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
			xhr.setRequestHeader(h, minusH[h]);
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

