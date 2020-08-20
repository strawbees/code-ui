const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.displayPageLoader

export default selector
