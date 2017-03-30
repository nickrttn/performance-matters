const delegator = require('dom-delegator')(); // eslint-disable-line no-unused-vars
const h = require('virtual-dom/h');

/**
 * [detail renders a detail article for an art object]
 * @param  {[String]} collectionURL [The URL this page was requested from, to navigate back to.]
 * @param  {[Object]} object        [Rijksmuseum API art object]
 * @param  {[Function]} handler 	  [Callback for the click handler, only used on the client.]
 * @return {[VNode]}                [a virtual-dom VNode containing a single art object]
 */
function detail(collectionURL, object, handler) {
	return h('article', {
		key: 'detail',
		dataset: {
			id: object.objectNumber,
			section: 'detail'
		}}, [
			h('a', {
				href: collectionURL,
				dataset: {link: 'close'},
				'ev-click': handler ? handler : null
			}, 'Go back to the collection'),
			h('h1', object.longTitle),
			h('img', {
				src: object.webImage.url.replace('http', 'https'),
				alt: object.longTitle,
				dataset: {
					guid: object.webImage.guid
				}
			}),
			h('div', {className: 'content'}, [
				h('p', object.label.description),
				h('p', h('a', {
					href: `https://rijksmuseum.nl/en/collection/${object.objectNumber}`
				}, 'See this artwork in even more detail on the Rijksmuseum website.'))
			])
		]);
}

module.exports = detail;
