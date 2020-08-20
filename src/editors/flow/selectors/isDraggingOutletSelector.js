const selector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.isDraggingOutlet

export default selector
