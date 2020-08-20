const selector = () => (state) =>
	state.storage &&
	state.storage.publicProfile &&
	state.storage.publicProfile.user &&
	state.storage.publicProfile.user.username

export default selector
