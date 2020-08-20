const selector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsBlockCurrentCardId
	) || null

export default selector
