const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		generatedCode,
		factoryCode,
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
		modalUploadBootloaderUpdater,
		modalDuplicateProgramData,
		modalShareProgramData,
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
		onSharePress     : () => modalShareProgramData({
			id,
			type,
			source,
			name,
		}),
		onImportPress                     : () => modalImportProgram(),
		onExportPress                     : () => exportProgramToFile({ type, source, name }),
		onUploadFactoryCodePress          : () => modalUploadCode(factoryCode),
		onUploadBootloaderUpdateCodePress : () => modalUploadBootloaderUpdater(),
	}
}

export default mergeProps
