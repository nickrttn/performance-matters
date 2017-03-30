/**
 * [sanitize cleans up API request data before it is stored and sent to the client.]
 * @param  {[Object]} data [Rijksmuseum API request data]
 * @return {[Object]}      [Cleaned up Rijksmuseum API request data]
 */
function sanitize(data) {
	const has = {}.hasOwnProperty;
	if (has.call(data, 'artObjects')) {
		data.artObjects = data.artObjects.filter(object => object.headerImage);
		data.artObjects = data.artObjects.map(object => ({
			id: object.id,
			objectNumber: object.objectNumber,
			title: object.title,
			longTitle: object.longTitle,
			headerImage: {
				url: object.headerImage.url,
				guid: object.headerImage.guid
			}
		}));
	} else if (has.call(data, 'artObject')) {
		data.artObject = {
			id: data.artObject.id,
			objectNumber: data.artObject.objectNumber,
			longTitle: data.artObject.longTitle,
			label: {
				description: data.artObject.label.description
			},
			webImage: {
				url: data.artObject.webImage.url,
				guid: data.artObject.webImage.guid
			}
		};
	}

	return data;
}

module.exports = sanitize;
