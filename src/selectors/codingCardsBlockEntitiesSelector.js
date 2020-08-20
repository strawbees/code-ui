const codingCardsBlockEntitiesSelector = () => (state) =>
	(
		state.setup &&
		state.setup.codingCards &&
		state.setup.codingCards.cards &&
		state.setup.codingCards.cards.block
	) || {}

export default codingCardsBlockEntitiesSelector
