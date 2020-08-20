const selector = () => (state) => (
	state.storage &&
	state.storage.programs
) || {}

export default selector
