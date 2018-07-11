export default (stateProps, dispatchProps, ownProps) => {
	const {
		clearStorage,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		logout : () => clearStorage(),
	}
}
