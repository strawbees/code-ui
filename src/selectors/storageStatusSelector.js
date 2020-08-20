const storageStatusSelector = () => (state) =>
	state.storage &&
	state.storage.status

export default storageStatusSelector
