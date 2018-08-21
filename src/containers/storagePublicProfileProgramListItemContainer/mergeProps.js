export default (stateProps, dispatchProps, ownProps) => {
	const {
		generatedCode,
		...otherStateProps
	} = stateProps
	const {
		type,
		name,
		source,
	} = stateProps
	const {
		id,
		...otherOwnProps
	} = ownProps

	const {
		modalRemoveProgram,
		modalDuplicateProgramData,
		modalUploadCode,
		exportProgramToFile,
		...otherDispatchProps
	} = dispatchProps

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onDuplicatePress : () => modalDuplicateProgramData({ type, source, name }),
		onSharePress     : () => {},
		onUploadPress    : () => modalUploadCode(generatedCode),
		onExportPress    : () => exportProgramToFile({ type, source, name }),
	}
}
