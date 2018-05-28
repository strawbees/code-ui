export default () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.source
	) || {}
