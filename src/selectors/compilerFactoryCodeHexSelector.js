const compilerFactoryCodeHexSelector = () => (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.factoryCodeHex
	) || null

export default compilerFactoryCodeHexSelector
