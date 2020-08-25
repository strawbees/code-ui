const storageCredentialsSelector = () => (state) =>
	state.storage &&
	state.storage.credentials

export default storageCredentialsSelector
