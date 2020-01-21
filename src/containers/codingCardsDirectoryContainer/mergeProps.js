export default (stateProps, dispatchProps, ownProps) => {
	const {
		flowTitle,
		blockTitle,
		flowCardIds,
		blockCardIds,
		...otherStateProps
	} = stateProps
	const {
		type,
	} = ownProps

	let title
	let cardIds
	switch (type) {
		case 'flow':
			title = flowTitle
			cardIds = flowCardIds
			break
		case 'block':
			title = blockTitle
			cardIds = blockCardIds
			break
		default:
			title = 'Coding Cards'
			cardIds = []
	}

	return {
		...otherStateProps,
		...dispatchProps,
		...ownProps,
		title,
		cardIds,
	}
}
