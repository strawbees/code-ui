const selector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.rootPath
	) || ''

export default selector
