const selector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.activeOutletLineRects

export default selector
