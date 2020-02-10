export default () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.codingCardsBlockFilterIds
	) || []
