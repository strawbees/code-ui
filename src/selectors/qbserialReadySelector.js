const selector = () => (state) =>
	(
		state.setup &&
		state.qbserial.ready
	) || false

export default selector
