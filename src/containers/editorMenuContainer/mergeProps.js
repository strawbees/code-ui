export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		generatedCode,
		...otherStateProps
	} = stateProps
	const {
		updateCurrentEditorProgramName,
		saveCurrentEditorProgram,
		resetCurrentEditorProgram,
		modalUploadCode,
		modalDuplicateProgramById,
		...otherDispatchProps
	} = dispatchProps
	return {
		...otherStateProps,
		...otherDispatchProps,
		...ownProps,
		onNameChange     : updateCurrentEditorProgramName,
		onSavePress      : saveCurrentEditorProgram,
		onNewPress       : resetCurrentEditorProgram,
		onUploadPress    : () => modalUploadCode(generatedCode),
		onDuplicatePress : () => modalDuplicateProgramById(id)
	}
}
