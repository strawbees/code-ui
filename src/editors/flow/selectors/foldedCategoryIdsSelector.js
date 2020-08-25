const foldedCategoryIdsSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.foldedCategories
	) || {}

export default foldedCategoryIdsSelector
