export default (stateProps, dispatchProps, ownProps) => {
	const {
		id : parameterId,
		instanceId : id,
		...otherOwnProps
	} = ownProps
	const {
		safeUpdateInstanceParameterByValueCode,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onValueCodeChange : (valueCode) => safeUpdateInstanceParameterByValueCode({
			id,
			parameterId,
			valueCode
		})
	}
}
