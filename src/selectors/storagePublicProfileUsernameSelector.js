export default () => (state) =>
	state.storage &&
	state.storage.publicProfile &&
	state.storage.publicProfile.user &&
	state.storage.publicProfile.user.username
