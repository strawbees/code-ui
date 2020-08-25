const storageUserSelector = () => (state) =>
	state.storage &&
	state.storage.user

export default storageUserSelector
