const isDraggingOutletSelector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.isDraggingOutlet

export default isDraggingOutletSelector
