const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.asPath

export default selector
