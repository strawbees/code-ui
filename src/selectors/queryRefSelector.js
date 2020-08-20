const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.query &&
	state.setup.query.ref

export default selector
