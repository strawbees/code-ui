const selector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.stringsLoaded
	) || {}

export default selector
