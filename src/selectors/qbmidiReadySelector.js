const qbmidiReadySelector = () => (state) =>
	(
		state.setup &&
		state.qbmidi.ready
	) || false

export default qbmidiReadySelector
