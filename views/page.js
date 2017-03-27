const h = require('virtual-dom/h');
const artObject = require('./art-object');

/**
 * [page renders a page of art pieces]
 * @param  {[Object]} data [Rijksmuseum API request data]
 * @param  {[Number]} page    [The collection page we're on]
 * @return [VNode]            [a virtual-dom VNode containing a page of art pieces]
 */
function page(data, page) {
	return h('div', {
		key: 'page',
		dataset: {page}
	}, data.artObjects.map(artObject));
}

module.exports = page;
