const convertModelToJSON = (model) => {
	const stringifiedModel = JSON.stringify(model);
	const parsedModel = JSON.parse(stringifiedModel);
	return parsedModel;
};

module.exports = { convertModelToJSON };
