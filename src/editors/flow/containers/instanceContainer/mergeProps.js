export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps
	const {
		safeUpdateInstanceId,
		otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onIdInputChange : (newId) => safeUpdateInstanceId({ id, newId })
	}
}
