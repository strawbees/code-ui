export default (stateProps, dispatchProps, ownProps) => {
	const {
		generatedCode,
		...otherStateProps
	} = stateProps
	const {
		updateCurrentEditorProgramName,
		saveCurrentEditorProgram,
		resetCurrentEditorProgram,
		modalUploadCode,
		...otherDispatchProps
	} = dispatchProps
	return {
		...otherStateProps,
		...otherDispatchProps,
		...ownProps,
		onNameChange      : updateCurrentEditorProgramName,
		onSavePress       : saveCurrentEditorProgram,
		onNewPress        : resetCurrentEditorProgram,
		initializeProgram : resetCurrentEditorProgram,
		onUploadPress     : () => modalUploadCode(generatedCode)
	}
}
