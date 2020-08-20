const selector = () => (state) =>
	(
		state &&
		state.flowEditor
	) || {}

export default selector
