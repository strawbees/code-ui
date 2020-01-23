export default () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsBlockCurrentCardId
	) || null
