const express = require('express');
const paginate = require('express-paginate');
const toString = require('vdom-to-html');

const load = require('../helpers/load');
const head = require('../views/app/head');
const render = require('../views/collection');
const foot = require('../views/app/foot');

require('dotenv').config();

const router = express.Router(); // eslint-disable-line new-cap

const endpoint = process.env.RIJKSMUSEUM_ENDPOINT;
const apiKey = process.env.RIJKSMUSEUM_APIKEY;

router.use(paginate.middleware(10, 100));

router.all((request, response, next) => {
	if (request.query.limit <= 10) {
		request.query.limit = 10;
	}

	next();
});

router.get('/', (request, response) => {
	const page = request.query.page;
	const limit = request.query.limit;
	const url = `${endpoint}?key=${apiKey}&ps=${limit}&p=${page - 1}&format=json&imgonly=true`;
	const callback = data => {
		response.type('.html');
		response.end(`
			${head}
			${toString(render(data, response.locals.paginate))}
			${foot}
		`);
	};

	load(url, callback);
});

module.exports = router;
