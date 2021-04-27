const qbserialAllowedStatusSelector = () => (state) =>
	(
		state.setup &&
		state.qbserial.allowedStatus
	) || [false, false]

export default qbserialAllowedStatusSelector
