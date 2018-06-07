export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		instanceId
	} = ownProps
	const {
		setInstanceParameter,
		highlightInstanceParameterDropArea,
		setIsDraggingOutlet,
		setOutletTransferDragMethods,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onDragStart : () => setIsDraggingOutlet(true),
		onDragStop  : () => setIsDraggingOutlet(false),
		onConnect   : (parameter) => setInstanceParameter({
			id          : parameter.instanceId,
			parameterId : parameter.parameterId,
			value       : `${instanceId}.${id}`
		}),
		onHover : (parameter) => {
			parameter = parameter ? {
				id          : parameter.instanceId,
				parameterId : parameter.parameterId
			} : null
			highlightInstanceParameterDropArea(parameter)
		},
		setDragMethods : (methods) => setOutletTransferDragMethods({
			outletId : id,
			instanceId,
			methods
		})
	}
}
