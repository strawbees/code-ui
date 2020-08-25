const outletTransferDragMethodsSelector = () => (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.outletTransferDragMethods
	) || {}

export default outletTransferDragMethodsSelector
