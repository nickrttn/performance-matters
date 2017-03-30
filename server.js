const fs = require('fs');
const express = require('express');
const compression = require('compression');

const collection = require('./routers/collection');
const detail = require('./routers/detail');
const api = require('./routers/api');
const offline = require('./routers/offline');

const head = require('./views/app/head');
const index = require('./views/index');
const foot = require('./views/app/foot');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', './views');

app.use(compression());
app.use(express.static('assets', {maxAge: '31d'}));

app.get('/', (request, response) => {
	fs.readFile('assets/critical-css/detail.css', 'utf8', onread);

	function onread(err, criticalCSS) {
		if (err) throw new Error(err); // eslint-disable-line curly

		response.type('.html');
		response.end(`
			${head(criticalCSS)}
			${index}
			${foot}
		`);
	}
});

app.use('/collection', collection);
app.use('/detail/', detail);
app.use('/api/', api);
app.use('/offline/', offline);

app.listen(app.get('port'), () => {
	console.log(`Application running on port ${app.get('port')}`);
});
