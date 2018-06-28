export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		generatedCode,
		...otherStateProps
	} = stateProps
	const {
		updateCurrentEditorProgramName,
		saveCurrentEditorProgram,
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
		onUploadPress    : () => modalUploadCode(generatedCode),
		onDuplicatePress : () => modalDuplicateProgramById(id)
	}
}
