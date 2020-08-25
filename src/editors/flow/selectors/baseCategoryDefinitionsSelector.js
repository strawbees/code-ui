const baseCategoryDefinitionsSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.categoryDefinitions
	) || {}

export default baseCategoryDefinitionsSelector
