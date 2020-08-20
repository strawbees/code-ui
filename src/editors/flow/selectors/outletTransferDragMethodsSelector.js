const selector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.outletTransferDragMethods
	) || {}

export default selector
