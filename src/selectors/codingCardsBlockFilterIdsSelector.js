const codingCardsBlockFilterIdsSelector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsBlockFilterIds
	) || []

export default codingCardsBlockFilterIdsSelector
