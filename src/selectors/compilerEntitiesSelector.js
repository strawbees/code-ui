const selector = () => (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.entities
	) || {}

export default selector
