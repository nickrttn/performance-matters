const https = require('https');
const concat = require('concat-stream');

module.exports = function (url, callback) {
	https.get(url, res => {
		const onend = buffer => {
			callback(JSON.parse(buffer));
		};

		res.on('error', error).pipe(concat(onend));
	});

	function error(error) {
		console.warn(error);
	}
};
