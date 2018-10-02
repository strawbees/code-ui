export default () => (state) =>
	(
		state.setup &&
		state.qbmidi.available
	) || false
