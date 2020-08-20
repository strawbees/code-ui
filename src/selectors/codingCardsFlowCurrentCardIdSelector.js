const codingCardsFlowCurrentCardIdSelector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsFlowCurrentCardId
	) || null

export default codingCardsFlowCurrentCardIdSelector
