const urlVarsSelector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.urlVars
	) || {}

export default urlVarsSelector
