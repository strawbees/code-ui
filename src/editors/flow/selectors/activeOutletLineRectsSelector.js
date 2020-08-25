const activeOutletLineRectsSelector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.activeOutletLineRects

export default activeOutletLineRectsSelector
