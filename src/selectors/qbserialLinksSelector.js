const qbserialLinksSelector = () => (state) =>
	(
		state.setup &&
		state.qbserial.links
	) || {}

export default qbserialLinksSelector
