import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/program'

export default autobindDispatchToActionCreators({
	onSourceChange : updateCurrentEditorProgramSource
})
