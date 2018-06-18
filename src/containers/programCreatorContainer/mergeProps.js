export default (stateProps, dispatchProps, ownProps) => {

	const {
		createNewProgramByTypeAndGoToEditor,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		createNewFlow    : () => createNewProgramByTypeAndGoToEditor('flow'),
		createNewScratch : () => createNewProgramByTypeAndGoToEditor('scratch'),
		createNewText    : () => createNewProgramByTypeAndGoToEditor('text'),
	}
}
