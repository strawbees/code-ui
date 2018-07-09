export default (stateProps, dispatchProps, ownProps) => {
	const {
		setCredentials,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		logout : () => setCredentials(null),
	}
}
