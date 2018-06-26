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
		modalRemoveProgram,
		modalDuplicateProgramById,
		modalUploadCode,
		...otherDispatchProps
	} = dispatchProps

	return {
		...otherStateProps,
		...otherDispatchProps,
		...otherOwnProps,
		onRemovePress    : () => modalRemoveProgram(id),
		onDuplicatePress : () => modalDuplicateProgramById(id),
		onSharePress     : () => {},
		onUploadPress    : () => modalUploadCode(generatedCode)
	}
}
