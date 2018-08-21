export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		generatedCode,
		source,
		safeName : name,
		...otherStateProps
	} = stateProps
	const {
		type
	} = stateProps
	const {
		updateCurrentEditorProgramName,
		saveCurrentEditorProgram,
		modalUploadCode,
		modalDuplicateProgramData,
		modalImportProgram,
		exportProgramToFile,
		...otherDispatchProps
	} = dispatchProps
	return {
		...otherStateProps,
		...otherDispatchProps,
		...ownProps,
		onNameChange     : updateCurrentEditorProgramName,
		onSavePress      : saveCurrentEditorProgram,
		onUploadPress    : () => modalUploadCode(generatedCode),
		onDuplicatePress : () => modalDuplicateProgramData({ type, source, name }),
		onImportPress    : () => modalImportProgram(),
		onExportPress    : () => exportProgramToFile({ type, source, name })
	}
}
