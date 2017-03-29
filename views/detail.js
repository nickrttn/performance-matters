const h = require('virtual-dom/h');

function detail(collectionURL, object) {
	return h('article', {
		dataset: {
			id: object.id,
			section: 'detail'
		}}, [
			h('a', {href: collectionURL}, 'Go back to the collection'),
			h('img', {
				src: object.webImage.url,
				alt: object.longTitle,
				dataset: {
					guid: object.webImage.guid
				}
			}),
			h('h1', object.longTitle),
			h('p', object.label.description)
		]);
}

module.exports = detail;
