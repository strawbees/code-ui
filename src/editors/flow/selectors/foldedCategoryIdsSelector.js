const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.foldedCategories
	) || {}

export default selector
