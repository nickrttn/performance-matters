process.setMaxListeners(0);

const critical = require('critical');

const baseURL = 'http://localhost:3000';
const baseDest = 'assets/critical-css';
const routes = [
	{
		url: `${baseURL}/`,
		dest: `${baseDest}/index.css`,
	}, {
		url: `${baseURL}/collection/`,
		dest: `${baseDest}/collection.css`,
	}, {
		url: `${baseURL}/detail?artwork=RP-P-OB-697`,
		dest: `${baseDest}/detail.css`,
	}, {
		url: `${baseURL}/offline`,
		dest: `${baseDest}/offline.css`,
	}
];

function generate(obj) {
	critical.generate({
		base: './',
		src: obj.url,
		dest: obj.dest,
		minify: true,
		timeout: 60000,
		ignore: ['@font-face', /\.fonts-loaded(\s)*.*/],
		dimensions: [{
			height: 640,
			width: 360
		}, {
			height: 960,
			width: 1150
		}]
	});
}

for (let i = routes.length - 1; i >= 0; i--) {
	generate(routes[i]);
}
