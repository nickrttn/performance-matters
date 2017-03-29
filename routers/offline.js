const express = require('express');
const toString = require('vdom-to-html');

const load = require('../helpers/load');
const head = require('../views/app/head');
const render = require('../views/offline');
const foot = require('../views/app/foot');

require('dotenv').config();

const router = express.Router(); // eslint-disable-line new-cap

const endpoint = process.env.RIJKSMUSEUM_ENDPOINT;
const apiKey = process.env.RIJKSMUSEUM_APIKEY;

router.get('/', offline);

function offline(request, response) {
	response.type('.html');
	response.end(`
		${head}
		${toString(render())}
		${foot}
	`)
}

module.exports = router;
