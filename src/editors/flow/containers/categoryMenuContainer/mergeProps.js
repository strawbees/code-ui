export default (stateProps, dispatchProps, ownProps) => {
	const {
		toggleFoldedCategory,
		...otherDispatchProps
	} = dispatchProps

	const {
		id,
		...otherOwnProps
	} = ownProps

	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		toggle : () => toggleFoldedCategory(id)
	}
}
