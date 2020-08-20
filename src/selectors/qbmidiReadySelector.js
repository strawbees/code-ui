const selector = () => (state) =>
	(
		state.setup &&
		state.qbmidi.ready
	) || false

export default selector
