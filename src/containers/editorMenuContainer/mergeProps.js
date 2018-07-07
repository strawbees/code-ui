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
		modalDuplicateProgramById,
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
		onDuplicatePress : () => modalDuplicateProgramById(id),
		onImportPress    : () => modalImportProgram(),
		onExportPress    : () => exportProgramToFile({ type, source, name })
	}
}
