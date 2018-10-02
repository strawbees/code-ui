export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		...otherOwnProps
	} = ownProps
	const {
		safeUpdateInstanceName,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onNameInputChange : (name) => safeUpdateInstanceName({ id, name })
	}
}
