const codingCardsHardwareEntitiesSelector = () => (state) =>
	(
		state.setup &&
		state.setup.codingCards &&
		state.setup.codingCards.hardware
	) || {}

export default codingCardsHardwareEntitiesSelector
