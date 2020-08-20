const selector = () => (state) =>
	state &&
	state.setup &&
	state.setup.os

export default selector
