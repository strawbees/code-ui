const selector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsFlowCurrentCardId
	) || null

export default selector
