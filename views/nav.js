const delegator = require('dom-delegator')(); // eslint-disable-line no-unused-vars
const h = require('virtual-dom/h');

/**
 * [nav renders pagination navigation elements for the collection page.]
 * @param  {[String]} href    [URL string]
 * @param  {[String]} type    [A string describing the type of navigation, previous or next.]
 * @param  {[Number]} page    [The collection page we are on.]
 * @param  {[Function]} handler [Callback for the click handler, only used on the client.]
 * @return [VNode]            [a virtual-dom VNode containing a single pagination nav element]
 */
function nav(href, type, page, handler) {
	const text = type === 'prev' ? 'Previous works of art' : 'More works of art';
	return h('nav', {
		key: type,
		dataset: {paginate: type}
	},
		(page <= 1 && type === 'prev') ? '' :
			h('a', {
				href,
				'ev-click': handler ? handler : null
			}, h('span', text)
			)
	);
}

module.exports = nav;
