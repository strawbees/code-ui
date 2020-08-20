const qbmidiAvailableSelector = () => (state) =>
	(
		state.setup &&
		state.qbmidi.available
	) || false

export default qbmidiAvailableSelector
