const compilerFactoryCodeRetrivalErrorSelector = () => (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.factoryCodeRetrivalError
	) || null

export default compilerFactoryCodeRetrivalErrorSelector
