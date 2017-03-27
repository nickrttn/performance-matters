module.exports = function (data) {
	if (Object.prototype.hasOwnProperty.call(data, 'artObjects')) {
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
	} else if (Object.prototype.hasOwnProperty.call(data, 'artObject')) {
		data.artObject = {
			id: data.artObject.id,
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
