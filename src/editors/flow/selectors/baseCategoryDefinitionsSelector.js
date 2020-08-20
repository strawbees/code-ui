const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.categoryDefinitions
	) || {}

export default selector
