export default (stateProps, dispatchProps, ownProps) => {
	const {
		id : parameterId,
		instanceId : id,
	} = ownProps
	const {
		safeUpdateInstanceParameterByValueCode,
		setDisconnectingParameterId,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onDisconnectStart : () => {
			setDisconnectingParameterId(`${id}.${parameterId}`)
		},
		onDisconnectStop : () => {
			setDisconnectingParameterId(null)
		},
		onValueCodeChange : (valueCode) => safeUpdateInstanceParameterByValueCode({
			id,
			parameterId,
			valueCode
		})
	}
}
