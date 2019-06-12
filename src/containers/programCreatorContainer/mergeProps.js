export default (stateProps, dispatchProps, ownProps) => {
	const {
		factoryCode,
		...otherStateProps
	} = stateProps

	const {
		modalImportProgram,
		modalUploadCode,
		...otherDispatchProps
	} = dispatchProps

	return {
		...otherStateProps,
		...otherDispatchProps,
		...ownProps,
		onImportPress            : () => modalImportProgram(),
		onUploadFactoryCodePress : () => modalUploadCode(factoryCode),
	}
}
