export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		...otherOwnProps
	} = ownProps
	const {
		safeupdateInstanceName,
		...otherDispatchProps
	} = dispatchProps
	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onNameInputChange : (name) => safeupdateInstanceName({ id, name })
	}
}
