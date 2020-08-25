const storagePublicProfileProgramsSelector = () => (state) =>
	state.storage &&
	state.storage.publicProfile &&
	state.storage.publicProfile.programs

export default storagePublicProfileProgramsSelector
