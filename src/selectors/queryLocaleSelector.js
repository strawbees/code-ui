const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.query &&
	state.setup.query.locale

export default selector
