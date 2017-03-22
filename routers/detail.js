const express = require('express');
const load = require('../helpers/load');

require('dotenv').config();

const router = express.Router(); // eslint-disable-line new-cap

const endpoint = process.env.RIJKSMUSEUM_ENDPOINT;
const apiKey = process.env.RIJKSMUSEUM_APIKEY;

router.get('/:artwork', artwork);

function artwork(request, response) {
	const id = request.params.artwork;
	const back = request.headers.referer;

	const callback = data => {
		response.render('detail', {object: data.artObject, back});
	};

	const url = `${endpoint}/${id}?key=${apiKey}&format=json&imgonly=true`;
	load(url, callback);
}

module.exports = router;
