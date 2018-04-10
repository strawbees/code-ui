export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps

	const {
		openProgramInEditorById,
		removeProgramAndClearEditor
	} = dispatchProps

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onEditPress      : () => openProgramInEditorById(id),
		onRemovePress    : () => removeProgramAndClearEditor(id),
		onSharePress     : () => {},
		onDuplicatePress : () => {},
	}
}
