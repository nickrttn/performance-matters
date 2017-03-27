const delegator = require('dom-delegator')();
const h = require("virtual-dom/h");
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const load = require('../../../helpers/load');

// Before anything else, register the Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
}

const paginationLinks = document.querySelectorAll('[data-paginate] a');
let pageNode = document.querySelector('[data-page]');

Array.from(paginationLinks).forEach(link => link.addEventListener('click', onpage));

function onpage(event) {
	event.preventDefault();
	const currentHref = event.currentTarget.href;
	const apiURL = new URL(currentHref);
	apiURL.pathname = '/api';
	load(apiURL.toString(), render);

	function render(response) {
		const params = apiURL.searchParams;
		if (Object.prototype.hasOwnProperty.call(response, 'artObjects')) {
			const newPageNode = h('div', {
				key: 'page',
				dataset: {
					page: params.get('page')
				}
			}, response.artObjects.map(renderObject));
			const patches = diff(pageNode, newPageNode);
			pageNode = patch(pageNode, patches);
			changeState(currentHref);
		} else if (Object.prototype.hasOwnProperty.call(response, 'artObject')) {
			console.log(response);
		}
	}
}

function changeState(href) {
	history.pushState({}, '', href.toString());
	renderNav(href);
}

function renderObject(object) {
	return h('article', {dataset: {object: object.id}}, [
		h('h2', [h('a', {href: `/artwork/${object.objectNumber}`}, object.title)]),
		h('img', {src: object.headerImage.url, alt: object.longTitle, dataset: {guid: object.headerImage.guid}})
	]);
}

function renderNav(href) {
	document.querySelectorAll('[data-paginate]').forEach(node => {
		const url = new URL(href);
		const modifier = node.dataset.paginate === 'next' ? 1 : -1;
		const span = node.querySelector('span');
		const text = span ? span.textContent : 'Previous works of art';

		url.searchParams.set('page', parseInt(url.searchParams.get('page')) + modifier);

		const newNode = h('nav', {
			key: node.dataset.paginate,
			dataset: {paginate: node.dataset.paginate}}, [
				h('a', {href: url.toString(), 'ev-click': onpage}, [
					h('span', text)
				])
			]
		);

		const patches = diff(node, newNode);
		patch(node, patches);
	});
}
