export default (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.entities
	) || {}
