const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.displayError

export default selector
