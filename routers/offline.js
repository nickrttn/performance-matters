const fs = require('fs');
const express = require('express');

const head = require('../views/app/head');
const render = require('../views/offline');
const foot = require('../views/app/foot');

require('dotenv').config();

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', offline);

function offline(request, response) {
	fs.readFile('assets/critical-css/offline.css', 'utf8', onread);

	function onread(err, criticalCSS) {
		if (err) throw new Error(err); // eslint-disable-line curly
		response.type('.html');
		response.end(`
			${head(criticalCSS)}
			${render()}
			${foot}
		`);
	}
}

module.exports = router;
