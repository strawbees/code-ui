const selector = () => (state) =>
	(
		state.setup &&
		state.qbserial.available
	) || false

export default selector
