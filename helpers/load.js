const request = require('superagent');
const concat = require('concat-stream');
const PouchDB = require('pouchdb');

const db = new PouchDB('collection');

module.exports = function (url, callback) {
	db.get(url)
		.then(doc => callback(doc.data))
		.catch(err => err.status === 404 ? request.get(url).then(onresponse, onerror) : onerror(err));

	function onresponse(response) {
		const data = sanitize(JSON.parse(response.text));
		db.put({_id: url, data}).then(() => callback(data));
	}

	function sanitize(data) {
		if (Object.prototype.hasOwnProperty.call(data, 'artObjects')) {
			data.artObjects = data.artObjects.filter(object => object.hasImage && object.headerImage);
			data.artObjects = data.artObjects.map(object => ({
				id: object.id,
				objectNumber: object.objectNumber,
				title: object.title,
				longTitle: object.longTitle,
				headerImage: {
					url: object.headerImage.url,
					guid: object.headerImage.guid
				}
			}));
		} else if (Object.prototype.hasOwnProperty.call(data, 'artObject')) {
			data.artObject = {
				id: data.artObject.id,
				longTitle: data.artObject.longTitle,
				label: {
					description: data.artObject.label.description
				},
				webImage: {
					url: data.artObject.webImage.url,
					guid: data.artObject.webImage.guid
				}
			};
		}

		return data;
	}

	function onerror(err) {
		throw new Error(err);
	}
};
