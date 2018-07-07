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
		modalDuplicateProgramById,
		modalUploadCode,
		exportProgramToFile,
		...otherDispatchProps
	} = dispatchProps

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onRemovePress    : () => modalRemoveProgram(id),
		onDuplicatePress : () => modalDuplicateProgramById(id),
		onSharePress     : () => {},
		onUploadPress    : () => modalUploadCode(generatedCode),
		onExportPress    : () => exportProgramToFile({ type, source, name }),
	}
}
