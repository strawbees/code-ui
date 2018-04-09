import generateNewProgramSource from 'src/utils/generateNewProgramSource'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		queryRef
	} = stateProps
	const {
		setFlowName,
		setFlowSource,
		setFlowSaved,
		setScratchName,
		setScratchSource,
		setScratchSaved,
		setTextName,
		setTextSource,
		setTextSaved,
	} = dispatchProps

	const editorActions = {
		flow : {
			setName   : setFlowName,
			setSource : setFlowSource,
			setSaved  : setFlowSaved,

		},
		scratch : {
			setName   : setScratchName,
			setSource : setScratchSource,
			setSaved  : setScratchSaved
		},
		text : {
			setName   : setTextName,
			setSource : setTextSource,
			setSaved  : setTextSaved
		},
	}
	const {
		setName,
		setSource
	} = editorActions[queryRef]

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		setName,
		initializeProgram : () => {
			setName('')
			setSource(generateNewProgramSource(queryRef))
		}
	}
}
