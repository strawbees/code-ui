const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		hardware,
		...otherStateProps
	} = stateProps

	return {
		...otherStateProps,
		...dispatchProps,
		...ownProps,
		title  : hardware.title,
		iconId : hardware.id,
	}
}

export default mergeProps
