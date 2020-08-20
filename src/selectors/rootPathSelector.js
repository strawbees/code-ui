const rootPathSelector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.rootPath
	) || ''

export default rootPathSelector
