const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		flowTitle,
		blockTitle,
		flowCardIds,
		blockCardIds,
		flowCurrentCardId,
		blockCurrentCardId,
		...otherStateProps
	} = stateProps
	const {
		setCodingCardsFlowCurrentCardId,
		setCodingCardsBlockCurrentCardId,
		...otherDispatchProps
	} = dispatchProps
	const {
		type,
	} = ownProps

	let title
	let cardIds
	let currentCardId
	let setCurrentCardId
	switch (type) {
		case 'flow':
			title = flowTitle
			cardIds = flowCardIds
			currentCardId = flowCurrentCardId
			setCurrentCardId = setCodingCardsFlowCurrentCardId
			break
		case 'block':
			title = blockTitle
			cardIds = blockCardIds
			currentCardId = blockCurrentCardId
			setCurrentCardId = setCodingCardsBlockCurrentCardId
			break
		default:
			title = 'Coding Cards'
			cardIds = []
			currentCardId = null
			setCurrentCardId = () => {}
	}

	return {
		...otherStateProps,
		...otherDispatchProps,
		...ownProps,
		title,
		cardIds,
		currentCardId,
		setCurrentCardId
	}
}

export default mergeProps
