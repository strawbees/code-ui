const selector = () => (state) =>
	(
		state.setup &&
		state.setup.locales
	) || []

export default selector
