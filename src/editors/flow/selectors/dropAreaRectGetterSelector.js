const selector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.getDropAreaRect

export default selector
