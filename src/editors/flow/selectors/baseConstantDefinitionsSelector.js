const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.constantDefinitions
	) || {}

export default selector
