const routesSelector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.routes
	) || []

export default routesSelector
