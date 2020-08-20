const sourceSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.source
	) || []

export default sourceSelector
