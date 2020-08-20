const selector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsBlockFilterIds
	) || []

export default selector
