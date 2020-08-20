const selector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.disconnectingParameterId

export default selector
