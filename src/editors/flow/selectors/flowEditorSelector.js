const flowEditorSelector = () => (state) =>
	(
		state &&
		state.flowEditor
	) || {}

export default flowEditorSelector
