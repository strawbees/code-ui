const compilerEntitiesSelector = () => (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.entities
	) || {}

export default compilerEntitiesSelector
