export default (stateProps, dispatchProps, ownProps) => {
	const {
		toggleFoldedCategory,
		...otherDispatchProps
	} = dispatchProps

	const {
		id,
		...otherOwnProps
	} = ownProps
	console.log('aaa')
	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		toggle : () => toggleFoldedCategory(id)
	}
}
