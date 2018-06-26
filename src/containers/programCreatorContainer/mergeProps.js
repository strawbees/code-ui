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
		createNewBlock : () => createNewProgramByTypeAndGoToEditor('block'),
		createNewText    : () => createNewProgramByTypeAndGoToEditor('text'),
	}
}
