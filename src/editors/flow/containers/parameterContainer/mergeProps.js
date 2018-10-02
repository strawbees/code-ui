export default (stateProps, dispatchProps, ownProps) => {
	const {
		addInstanceParameterItem,
		removeInstanceParameterItem,
		...otherDispatchProps
	} = dispatchProps

	const {
		id : parameterId,
		instanceId : id,
	} = ownProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		addItem : () => addInstanceParameterItem({
			parameterId,
			id
		}),
		removeItem : (parameterIndex) => removeInstanceParameterItem({
			parameterIndex,
			parameterId,
			id
		}),
	}
}
