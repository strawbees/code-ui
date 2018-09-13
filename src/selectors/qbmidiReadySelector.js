export default () => (state) =>
	(
		state.setup &&
		state.qbmidi.ready
	) || false
