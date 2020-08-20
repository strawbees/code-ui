const selector = () => (state) =>
	state.storage &&
	state.storage.remoteMirror

export default selector
