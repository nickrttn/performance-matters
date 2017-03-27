const express = require('express');
const compression = require('compression');

const collection = require('./routers/collection');
const detail = require('./routers/detail');
const api = require('./routers/api');

const head = require('./views/app/head');
const index = require('./views/index');
const foot = require('./views/app/foot');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', './views');

app.use(compression());
app.use(express.static('assets', {maxAge: '31d'}));

app.get('/', (request, response) => {
	response.type('.html');
	response.end(`
		${head}
		${index}
		${foot}
	`);
});

app.use('/collection', collection);
app.use('/artwork/', detail);
app.use('/api/', api);

app.listen(app.get('port'), () => {
	console.log(`Application running on port ${app.get('port')}`);
});
