const disconnectingParameterIdSelector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.disconnectingParameterId

export default disconnectingParameterIdSelector
