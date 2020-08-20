const qbserialAvailableSelector = () => (state) =>
	(
		state.setup &&
		state.qbserial.available
	) || false

export default qbserialAvailableSelector
