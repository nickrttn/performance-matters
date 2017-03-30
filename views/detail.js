const h = require('virtual-dom/h');

/**
 * [detail renders a detail article for an art object]
 * @param  {[String]} collectionURL [The URL this page was requested from, to navigate back to.]
 * @param  {[Object]} object        [Rijksmuseum API art object]
 * @return {[VNode]}               [a virtual-dom VNode containing a single art object]
 */
function detail(collectionURL, object) {
	return h('article', {
		key: 'detail',
		dataset: {
			id: object.objectNumber,
			section: 'detail'
		}}, [
			h('a', {href: collectionURL, dataset: {link: 'close'}}, 'Go back to the collection'),
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
				h('p', h('a', {href: `https://rijksmuseum.nl/en/collection/${object.objectNumber}`}, 'See this artwork in even more detail on the Rijksmuseum website.'))
			])
		]);
}

module.exports = detail;
