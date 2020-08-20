const selector = () => (state) =>
	(
		state.setup &&
		state.qbmidi.available
	) || false

export default selector
