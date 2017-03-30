'use strict';

const createElement = require('virtual-dom/create-element');
const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');

const load = require('../../../helpers/load');
const nav = require('../../../views/nav');
const page = require('../../../views/page');
const detail = require('../../../views/detail');

// Before anything else, register the Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
}

const collection = document.querySelector('[data-section="collection"]');

attachListeners();

function attachListeners() {
	if (collection) {
		Array.from(document.links).forEach(link => link.addEventListener('click', onpage));
	}
}

function onpage(event) {
	const targetHref = new URL(event.currentTarget.href);
	const params = targetHref.searchParams;

	const apiURL = new URL(targetHref);

	if (params.get('artwork')) {
		apiURL.pathname = '/api/detail';
	} else {
		apiURL.pathname = '/api';
	}

	load(apiURL.toString(), render);

	function render(response) {
		const has = {}.hasOwnProperty;
		if (has.call(response, 'artObjects')) {
			const pageNode = document.querySelector('[data-page]');
			const newPageNode = page(response, params.get('page'));
			patch(pageNode, diff(pageNode, newPageNode));

			changeState(targetHref);
			renderNav(targetHref);
			attachListeners();
		} else if (has.call(response, 'artObject')) {
			const wrapper = createElement(h(
				'section',
				{
					dataset: {
						section: 'wrapper'
					}
				},
				detail(response.back, response.artObject, onclose)
			));
			document.body.insertAdjacentElement('afterbegin', wrapper);
			changeState(targetHref);
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

function onclose(event) {
	event.preventDefault();
	changeState(event.currentTarget.href);

	const wrapper = document.querySelector('[data-section="wrapper"]');

	wrapper.addEventListener('animationend', remove, {passive: true});

	function remove() {
		wrapper.removeEventListener('animationend', remove);
		wrapper.remove();
	}

	wrapper.style.animationPlayState = 'paused';

	// Wait for 8 ms after setting animationPlayState to trigger the animation
	setTimeout(() => {
		wrapper.classList.add('out');
		wrapper.style.animationPlayState = 'running';
	}, 8);
}
