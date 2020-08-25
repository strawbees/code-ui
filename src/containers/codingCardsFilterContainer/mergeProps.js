const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		flowFilterIds,
		blockFilterIds,
		...otherStateProps
	} = stateProps
	const {
		setCodingCardsFlowFilterIds,
		setCodingCardsBlockFilterIds,
		...otherDispatchProps
	} = dispatchProps
	const {
		type,
		...otherOwnProps
	} = ownProps

	let currentFilterIds
	let setFilterIds
	switch (type) {
		case 'flow':
			currentFilterIds = flowFilterIds
			setFilterIds = setCodingCardsFlowFilterIds
			break
		case 'block':
			currentFilterIds = blockFilterIds
			setFilterIds = setCodingCardsBlockFilterIds
			break
		default:
			currentFilterIds = []
			setFilterIds = () => {}
	}

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		currentFilterIds,
		setFilterIds,
	}
}

export default mergeProps
