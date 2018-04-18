export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps

	const {
		openProgramByIdAndGoToEditor,
		modalRemoveProgram,
		modalDuplicateProgramById
	} = dispatchProps

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onEditPress      : () => openProgramByIdAndGoToEditor(id),
		onRemovePress    : () => modalRemoveProgram(id),
		onDuplicatePress : () => modalDuplicateProgramById(id),
		onSharePress     : () => {},
	}
}
