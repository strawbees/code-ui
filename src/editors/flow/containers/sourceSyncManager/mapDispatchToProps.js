import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { setSource } from 'src/editors/flow/actions'
import { updateCurrentEditorProgramSource } from 'src/actions/program'

export default autobindDispatchToActionCreators({
	setSource,
	setRefEditorSource : updateCurrentEditorProgramSource,
})
