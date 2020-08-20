const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.factoryCode

export default selector
