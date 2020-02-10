export default (stateProps, dispatchProps, ownProps) => {
	const {
		entry,
		...otherStateProps
	} = stateProps
	const {
		closeModal,
		setCodingCardsFlowCurrentCardId,
		setCodingCardsBlockCurrentCardId,
		...otherDispatchProps
	} = dispatchProps
	const {
		type,
		onClick,
		id,
		...otherOwnProps
	} = ownProps

	let setCurrentCardId
	switch (type) {
		case 'flow':
			setCurrentCardId = setCodingCardsFlowCurrentCardId
			break
		case 'block':
			setCurrentCardId = setCodingCardsBlockCurrentCardId
			break
		default:
			setCurrentCardId = () => {}
	}

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		type,
		setCurrentCardId,
		title      : entry.title,
		slides     : entry.slides,
		onOpenCode : closeModal
	}
}
