const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.source
	) || []

export default selector
