const selector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.strings
	) || {}

export default selector
