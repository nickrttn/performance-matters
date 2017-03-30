const h = require('virtual-dom/h');

/**
 * [artObject Render VirtualDOM VNodes for single art objects]
 * @param  {[object]} object [API data from the Rijksmuseum for a single art piece]
 * @return [VNode]           [a virtual-dom VNode for a single art piece]
 */
function artObject(object, index) {
	return h('article', {key: index, dataset: {object: object.id}}, [
		h('h2', [h('a', {href: `/detail?artwork=${object.objectNumber}`}, object.title)]),
		h('img', {src: object.headerImage.url.replace('http', 'https'), alt: object.longTitle, dataset: {guid: object.headerImage.guid}})
	]);
}

module.exports = artObject;
