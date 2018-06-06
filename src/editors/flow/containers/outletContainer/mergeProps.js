export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		instanceId,
		...otherOwnProps
	} = ownProps
	const {
		setInstanceParameter,
		highlightInstanceParameterDropArea,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onConnect : (parameter) => setInstanceParameter({
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
		}
	}
}
