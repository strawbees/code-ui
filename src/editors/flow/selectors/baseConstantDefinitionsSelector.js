const baseConstantDefinitionsSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.constantDefinitions
	) || {}

export default baseConstantDefinitionsSelector
