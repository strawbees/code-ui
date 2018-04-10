import { removeProgram } from 'src/utils/storage'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		type
	} = stateProps
	const {
		id
	} = ownProps
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
		openProgramInEditorById
	} = dispatchProps

	let setName
	let setSource
	let setId

	switch (type) {
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
		onEditPress : async () => {
			openProgramInEditorById(id)
			// const { href, as } = resolveLinkUrl(editorUrl)
			// href.query.program = JSON.stringify({
			// 	id, name, source
			// })
			// setId(id)
			// setName(name)
			// setSource(source)

			// Router.push(href, as)
		},
		onRemovePress : async () => {
			await removeProgram(id)
			console.warn('this is wrong, need to check if the ref data is the same as the one being deleted. only then it makes sense to replace it')
			setId(null)
			setName('')
			setSource(generateNewProgramSource(type))
		},
		onSharePress : () => {
		},
		onDuplicatePress : () => {
		},
	}
}
