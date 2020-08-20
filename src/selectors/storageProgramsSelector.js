const storageProgramsSelector = () => (state) => (
	state.storage &&
	state.storage.programs
) || {}

export default storageProgramsSelector
