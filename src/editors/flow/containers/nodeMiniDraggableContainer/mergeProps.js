const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		toggleFoldedCategory,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		toggle : () => toggleFoldedCategory()
	}
}

export default mergeProps
