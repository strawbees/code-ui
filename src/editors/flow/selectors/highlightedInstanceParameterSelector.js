const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.highlightedInstanceParameter
	) || {}

export default selector
