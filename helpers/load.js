const request = require('superagent');
const PouchDB = require('pouchdb');
const sanitize = require('./sanitize');

const db = new PouchDB('collection');

module.exports = function (url, callback) {
	db.get(url)
		.then(doc => callback(doc.data))
		.catch(err => err.status === 404 ? request.get(url).then(onresponse, onerror) : onerror(err));

	function onresponse(response) {
		const data = sanitize(JSON.parse(response.text));
		db.put({_id: url, data}).then(() => callback(data));
	}

	function onerror(err) {
		throw new Error(err);
	}
};
