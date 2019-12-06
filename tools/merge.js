#!/usr/bin/env node
const fs=require('fs');

let out=process.argv[2];
let files=process.argv.slice(3);

let modules=Object.create(null);
for(let file of files) {
	let modname=file.match(/([a-zA-Z0-9_-]+)\.js/)[1]
	let code=fs.readFileSync(file, 'utf8');
	modules[modname]=code;
}

let modulesrc=[];
for(let module in modules) {
	modulesrc.push(`require.code["${module}"]=\`(() => {${modules[module].replace(/`/g, '\`')}})();\``);
}

fs.writeFileSync(out, `
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
	${modulesrc.join('\n')}
	require.cache=Object.create(null);
`);
