const qbserialReadySelector = () => (state) =>
	(
		state.setup &&
		state.qbserial.ready
	) || false

export default qbserialReadySelector
