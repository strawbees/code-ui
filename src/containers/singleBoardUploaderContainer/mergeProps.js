export default (stateProps, dispatchProps, ownProps) => {
	const {
		uploadHex,
		...otherDispatchProps
	} = dispatchProps
	const {
		runtimeId,
		hex
	} = ownProps
	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onUploadPress : () => uploadHex(runtimeId, hex)
	}
}
