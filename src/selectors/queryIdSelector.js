const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.query &&
	state.setup.query.id

export default selector
