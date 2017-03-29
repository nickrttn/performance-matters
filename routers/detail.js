const express = require('express');
const toString = require('vdom-to-html');

const load = require('../helpers/load');
const head = require('../views/app/head');
const render = require('../views/detail');
const foot = require('../views/app/foot');

require('dotenv').config();

const router = express.Router(); // eslint-disable-line new-cap

const endpoint = process.env.RIJKSMUSEUM_ENDPOINT;
const apiKey = process.env.RIJKSMUSEUM_APIKEY;

router.get('/:artwork', artwork);

function artwork(request, response) {
	const id = request.params.artwork;
	const collectionURL = request.headers.referer;

	const callback = data => {
		response.type('.html');
		response.end(`
			${head}
			${toString(render(collectionURL, data.artObject))}
			${foot}
		`)
	};

	const url = `${endpoint}/${id}?key=${apiKey}&format=json&imgonly=true`;
	load(url, callback);
}

module.exports = router;
