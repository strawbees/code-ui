export default (stateProps, dispatchProps, ownProps) => {
	const {
		generatedCode,
		...otherStateProps
	} = stateProps

	const {
		id,
		...otherOwnProps
	} = ownProps

	const {
		openProgramByIdAndGoToEditor,
		modalRemoveProgram,
		modalDuplicateProgramById,
		modalUploadCode,
		...otherDispatchProps
	} = dispatchProps

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onEditPress      : () => openProgramByIdAndGoToEditor(id),
		onRemovePress    : () => modalRemoveProgram(id),
		onDuplicatePress : () => modalDuplicateProgramById(id),
		onSharePress     : () => {},
		onUploadPress    : () => modalUploadCode(generatedCode)
	}
}
