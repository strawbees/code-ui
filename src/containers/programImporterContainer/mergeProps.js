export default (stateProps, dispatchProps, ownProps) => {
	const {
		modalImportProgram,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onImportPress : () => modalImportProgram(),
	}
}
