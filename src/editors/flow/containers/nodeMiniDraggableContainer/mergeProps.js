export default (stateProps, dispatchProps, ownProps) => {
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
