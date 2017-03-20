const https = require('https');
const concat = require('concat-stream');
const express = require('express');
const compression = require('compression');
const paginate = require('express-paginate');

require('dotenv').config();

const endpoint = 'https://www.rijksmuseum.nl/api/en/collection';
const apiKey = process.env.RIJKSMUSEUM_APIKEY;

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(compression());
app.use(express.static('assets', {maxAge: '31d'}));
app.use(paginate.middleware(10, 100));

app.all((request, response, next) => {
	if (request.query.limit <= 10) {
		request.query.limit = 10;
	}

	next();
});

app.get('/', (request, response) => {
	response.render('index', {});
});

app.get('/collection', collection);
app.get('/artwork/:artwork', artwork);

app.listen(3000);

function collection(request, response) {
	// Get pagination requests parameters from the query or use a default.
	const page = request.query.page;
	const limit = request.query.limit;
	const url = `${endpoint}?key=${apiKey}&format=json&ps=${limit}&p=${page - 1}&imgonly=True`;
	const callback = data => {
		response.render('collection', {
			page,
			collection: data.artObjects.filter(object => Boolean(object.headerImage))
		});
	};

	load(url, callback);
}

function artwork(request, response) {
	const id = request.params.artwork;
	const url = `${endpoint}/${id}?key=${apiKey}&format=json&imgonly=true`;
	const callback = data => {
		response.render('detail', {object: data.artObject});
	};

	load(url, callback);
}

function load(url, callback) {
	https.get(url, res => {
		const onend = buffer => {
			callback(JSON.parse(buffer));
		};

		res.on('error', error).pipe(concat(onend));
	});
}

function error(error) {
	console.warn(error);
}
