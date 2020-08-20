const stringsLoadedSelector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.stringsLoaded
	) || {}

export default stringsLoadedSelector
