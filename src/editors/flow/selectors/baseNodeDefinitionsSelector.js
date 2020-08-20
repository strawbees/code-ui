const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.nodeDefinitions
	) || {}

export default selector
