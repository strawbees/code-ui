const qbserialAllowedSelector = () => (state) =>
	(
		state.setup &&
		state.qbserial.allowed
	) || false

export default qbserialAllowedSelector
