const selector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsFlowFilterIds
	) || []

export default selector
