const selector = () => (state) =>
	(
		state.setup &&
		state.qbmidi.links
	) || {}

export default selector
