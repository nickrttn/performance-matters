const express = require('express');
const compression = require('compression');

const collection = require('./routers/collection');
const detail = require('./routers/detail');
const api = require('./routers/api');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(compression());
app.use(express.static('assets', {maxAge: '31d'}));

app.get('/', (request, response) => {
	response.render('index');
});

app.use('/collection', collection);
app.use('/artwork/', detail);
app.use('/api/', api);

const port = process.env.NODE_ENV === production ? 80 : 3000;

console.log(port);

app.listen(port);
