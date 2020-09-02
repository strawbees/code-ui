const reportSelector = () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.simulator &&
		state.setup.simulator.report
	) || []

export default reportSelector
