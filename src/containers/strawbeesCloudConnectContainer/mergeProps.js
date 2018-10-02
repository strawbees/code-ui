export default (stateProps, dispatchProps, ownProps) => {
	const {
		modalSignup,
		modalSignin,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		signup : () => modalSignup('strawbees'),
		signin : () => modalSignin('strawbees'),
	}
}
