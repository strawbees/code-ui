const selector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.urlVars
	) || {}

export default selector
