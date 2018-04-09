export default (stateProps, dispatchProps, ownProps) => {
	const {
		setScratchSource,
		setScratchGeneratedCode
	} = dispatchProps


	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onSourceChange : (source) => {
			setScratchSource(source)
			// setScratchGeneratedCode()
		}
	}
}
