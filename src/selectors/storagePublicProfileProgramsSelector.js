const selector = () => (state) =>
	state.storage &&
	state.storage.publicProfile &&
	state.storage.publicProfile.programs

export default selector
