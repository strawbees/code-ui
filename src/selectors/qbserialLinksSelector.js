export default () => (state) =>
	(
		state.setup &&
		state.qbserial.links
	) || {}
