const stringsSelector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.strings
	) || {}

export default stringsSelector
