const selector = () => (state) =>
	(
		state.setup &&
		state.qbserial.links
	) || {}

export default selector
