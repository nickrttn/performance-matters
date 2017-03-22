const https = require('https');
const concat = require('concat-stream');
const PouchDB = require('pouchdb');

const db = new PouchDB('collection');

module.exports = async (url, callback) => {
	try {
		const response = await db.get(url);
		await callback(response.data);
	} catch (err) {
		https.get(url, res => {
			res.on('error', err => {
				throw new Error(err);
			}).pipe(concat(onend));

			async function onend(buffer) {
				try {
					const data = JSON.parse(buffer);
					await db.put({_id: url, data});
					callback(data);
				} catch (error) {
					throw new Error(error);
				}
			}
		});
	}
};
