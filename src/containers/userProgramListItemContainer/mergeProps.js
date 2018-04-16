export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps

	const {
		openProgramByIdAndGoToEditor,
		modalRemoveProgram,
		modalDuplicateProgram
	} = dispatchProps

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onEditPress      : () => openProgramByIdAndGoToEditor(id),
		onRemovePress    : () => modalRemoveProgram(id),
		onDuplicatePress : () => modalDuplicateProgram(id),
		onSharePress     : () => {},
	}
}
