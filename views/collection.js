const h = require('virtual-dom/h');

const nav = require('./nav');
const page = require('./page');

/**
 * [collection renders a containing section for the art page and a set of previous/next page navigations]
 * @param  {[Object]} data     [Rijksmuseum API request data]
 * @param  {[Object]} paginate [express-paginate variables and functions]
 * @return [VNode]            [a virtual-dom VNode containing the art collection and pagination]
 */
function collection(data, paginate) {
	return h('section', {
		key: 'collection',
		dataset: {
			section: 'collection'
		}
	}, [
		nav(paginate.href(true), 'prev', paginate.page, false),
		page(data, paginate.page),
		nav(paginate.href(), 'next', paginate.page, false)
	]);
}

module.exports = collection;
