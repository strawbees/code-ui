const mergeProps = (stateProps, dispatchProps, ownProps) => {
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

export default mergeProps
