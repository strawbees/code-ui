export default () => (state) =>
	(
		state.setup &&
		state.qbmidi.links
	) || {}
