export default (stateProps, dispatchProps, ownProps) => {
	const {
		titleFlow,
		titleBlock,
		...otherStateProps
	} = stateProps
	const {
		type,
	} = ownProps

	let title
	switch (type) {
		case 'flow':
			title = titleFlow
			break
		case 'block':
			title = titleBlock
			break
		default:
			title = 'Coding Cards'
	}
	return {
		...otherStateProps,
		...dispatchProps,
		...ownProps,
		title,
	}
}
