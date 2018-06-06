export default (stateProps, dispatchProps, ownProps) => {
	const {
		id : parameterId,
		instanceId : id,
	} = ownProps
	const {
		safeUpdateInstanceParameterByValueCode,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onValueCodeChange : (valueCode) => safeUpdateInstanceParameterByValueCode({
			id,
			parameterId,
			valueCode
		})
	}
}
