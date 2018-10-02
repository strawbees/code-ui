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
		modalShareProgramData,
		modalUploadCode,
		exportProgramToFile,
		...otherDispatchProps
	} = dispatchProps

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onDuplicatePress : () => modalDuplicateProgramData({ type, source, name }),
		onSharePress     : () => modalShareProgramData({
			id,
			type,
			source,
			name,
		}),
		onUploadPress : () => modalUploadCode(generatedCode),
		onExportPress : () => exportProgramToFile({ type, source, name }),
	}
}
