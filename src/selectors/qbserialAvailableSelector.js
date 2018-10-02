export default () => (state) =>
	(
		state.setup &&
		state.qbserial.available
	) || false
