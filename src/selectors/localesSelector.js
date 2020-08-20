const localesSelector = () => (state) =>
	(
		state.setup &&
		state.setup.locales
	) || []

export default localesSelector
