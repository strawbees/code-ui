export default () => (state) => (
	state.storage &&
	state.storage.ready
) || false
