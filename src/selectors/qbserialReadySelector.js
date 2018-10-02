export default () => (state) =>
	(
		state.setup &&
		state.qbserial.ready
	) || false
