const codingCardsFlowEntitiesSelector = () => (state) =>
	(
		state.setup &&
		state.setup.codingCards &&
		state.setup.codingCards.cards &&
		state.setup.codingCards.cards.flow
	) || {}

export default codingCardsFlowEntitiesSelector
