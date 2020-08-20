const codingCardsFlowFilterIdsSelector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsFlowFilterIds
	) || []

export default codingCardsFlowFilterIdsSelector
