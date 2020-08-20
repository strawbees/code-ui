const selector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.routes
	) || []

export default selector
