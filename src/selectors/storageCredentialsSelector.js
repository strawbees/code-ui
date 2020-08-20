const selector = () => (state) =>
	state.storage &&
	state.storage.credentials

export default selector
