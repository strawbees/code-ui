const baseNodeDefinitionsSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.nodeDefinitions
	) || {}

export default baseNodeDefinitionsSelector
