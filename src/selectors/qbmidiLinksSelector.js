const qbmidiLinksSelector = () => (state) =>
	(
		state.setup &&
		state.qbmidi.links
	) || {}

export default qbmidiLinksSelector
