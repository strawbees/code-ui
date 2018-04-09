export default (stateProps, dispatchProps) => {
	const {
		queryRef
	} = stateProps
	const {
		setFlowName,
		setFlowSaved,
		setScratchName,
		setScratchSaved,
		setTextName,
		setTextSaved,
	} = dispatchProps

	const editorActions = {
		flow : {
			setName  : setFlowName,
			setSaved : setFlowSaved
		},
		scratch : {
			setName  : setScratchName,
			setSaved : setScratchSaved
		},
		text : {
			setName  : setTextName,
			setSaved : setTextSaved
		},
	}
	return {
		...stateProps,
		...dispatchProps,
		...editorActions[queryRef]
	}
}
