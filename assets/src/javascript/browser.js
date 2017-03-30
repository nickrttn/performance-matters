const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');

const load = require('../../../helpers/load');
const nav = require('../../../views/nav');
const page = require('../../../views/page');

// Before anything else, register the Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
}

const paginationLinks = document.querySelectorAll('[data-paginate] a');
paginationLinks.forEach(link => link.addEventListener('click', onpage));

function onpage(event) {
	const targetHref = new URL(event.currentTarget.href);
	const params = targetHref.searchParams;

	const apiURL = new URL(targetHref);
	apiURL.pathname = '/api';

	load(apiURL.toString(), render);

	function render(response) {
		const has = {}.hasOwnProperty;
		if (has.call(response, 'artObjects')) {
			const pageNode = document.querySelector('[data-page]');
			const newPageNode = page(response, params.get('page'));
			patch(pageNode, diff(pageNode, newPageNode));

			changeState(targetHref);
			renderNav(targetHref);
		} else if (has.call(response, 'artObject')) {
			console.log(response);
		}
	}

	event.preventDefault();
}

function changeState(href) {
	history.pushState({}, '', href.toString());
}

function renderNav(href) {
	document.querySelectorAll('[data-paginate]').forEach(node => {
		const url = new URL(href);
		const modifier = node.dataset.paginate === 'next' ? 1 : -1;
		const page = parseInt(url.searchParams.get('page'), 10);
		url.searchParams.set('page', page + modifier);

		const newNode = nav(
			url.toString(),
			node.dataset.paginate,
			page,
			onpage
		);

		patch(node, diff(node, newNode));
	});
}
