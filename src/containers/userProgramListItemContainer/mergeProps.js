export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps

	const {
		openProgramByIdAndGoToEditor,
		removeProgramByIdAndClearEditor,
		openModal
	} = dispatchProps

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onEditPress   : () => openProgramByIdAndGoToEditor(id),
		onRemovePress : () => {
			openModal()
			// removeProgramByIdAndClearEditor(id)
		},
		onSharePress     : () => {},
		onDuplicatePress : () => {},
	}
}
