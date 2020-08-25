const factoryCodeSelector = () => (state) =>
	state &&
	state.setup &&
	state.setup.factoryCode

export default factoryCodeSelector
