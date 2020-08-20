const highlightedInstanceParameterSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.highlightedInstanceParameter
	) || {}

export default highlightedInstanceParameterSelector
