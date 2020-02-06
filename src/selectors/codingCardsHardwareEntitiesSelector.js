export default () => (state) =>
	(
		state.setup &&
		state.setup.codingCards &&
		state.setup.codingCards.hardware
	) || {}
