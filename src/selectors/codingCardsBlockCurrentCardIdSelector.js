const codingCardsBlockCurrentCardIdSelector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsBlockCurrentCardId
	) || null

export default codingCardsBlockCurrentCardIdSelector
