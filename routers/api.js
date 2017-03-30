const express = require('express');
const paginate = require('express-paginate');
const load = require('../helpers/load');

require('dotenv').config();

const router = express.Router(); // eslint-disable-line new-cap

const endpoint = process.env.RIJKSMUSEUM_ENDPOINT;
const apiKey = process.env.RIJKSMUSEUM_APIKEY;

router.use(paginate.middleware(10, 100));

router.get('/', collection);
router.get('/detail', detail);

function detail(request, response) {
	const id = request.query.artwork;
	const back = request.headers.referer;

	const callback = data => {
		response.json({artObject: data.artObject, back});
	};

	const url = `${endpoint}/${id}?key=${apiKey}&format=json&imgonly=true`;
	load(url, callback);
}

function collection(request, response) {
	const page = request.query.page;
	const limit = request.query.limit;

	const callback = data => {
		response.json(data);
	};

	const url = `${endpoint}?key=${apiKey}&ps=${limit}&p=${page - 1}&format=json&imgonly=true`;
	load(url, callback);
}

module.exports = router;
