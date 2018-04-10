import {
	addProgram,
	updateProgramName
} from 'src/utils/storage'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		queryRef,
		saved,
		id
	} = stateProps
	const {
		setFlowName,
		setFlowSource,
		setFlowId,
		setScratchName,
		setScratchSource,
		setScratchId,
		setTextName,
		setTextSource,
		setTextId,
	} = dispatchProps

	let setName
	let setSource
	let setId

	switch (queryRef) {
		case 'flow':
			setName = setFlowName
			setSource = setFlowSource
			setId = setFlowId
			break
		case 'scratch':
			setName = setScratchName
			setSource = setScratchSource
			setId = setScratchId
			break
		case 'text':
			setName = setTextName
			setSource = setTextSource
			setId = setTextId
			break
		default:
			break
	}

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onNameChange : (name) => {
			setName(name)
			if (saved) {
				updateProgramName(id, name)
			}
		},
		onSavePress : async () => {
			const {
				name,
				source
			} = stateProps
			const doc = await addProgram(queryRef, name, source)
			setId(doc.id)
		},
		initializeProgram : () => {
			setId(null)
			setName('')
			setSource(generateNewProgramSource(queryRef))
		}
	}
}
