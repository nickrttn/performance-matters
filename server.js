const express = require('express');
const compression = require('compression');

const collection = require('./routers/collection');
const detail = require('./routers/detail');
const api = require('./routers/api');

const app = express();

app.set('port', (process.env.PORT || 3000));

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

app.listen(app.get('port'));
