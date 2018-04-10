export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps

	const {
		openProgramByIdAndGoToEditor,
		removeProgramByIdAndClearEditor
	} = dispatchProps

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onEditPress      : () => openProgramByIdAndGoToEditor(id),
		onRemovePress    : () => removeProgramByIdAndClearEditor(id),
		onSharePress     : () => {},
		onDuplicatePress : () => {},
	}
}
