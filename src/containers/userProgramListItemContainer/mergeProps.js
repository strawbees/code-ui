export default (stateProps, dispatchProps, ownProps) => {
	const {
		id
	} = ownProps

	const {
		openProgramByIdAndGoToEditor,
		removeProgramByIdAndClearEditor,
		openDialogModal
	} = dispatchProps

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onEditPress   : () => openProgramByIdAndGoToEditor(id),
		onRemovePress : () => openDialogModal(
			'Are you sureaa',
			{
				displayCancel   : true,
				displayConfirm  : true,
				displayLabelKey : 'ui.editor.remove',
				onConfirm       : () => removeProgramByIdAndClearEditor(id)
			}
		),
		onSharePress     : () => {},
		onDuplicatePress : () => {},
	}
}
