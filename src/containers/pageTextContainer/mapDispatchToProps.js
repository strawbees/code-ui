import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'

export default autobindDispatchToActionCreators({
	onSourceChange : updateCurrentEditorProgramSource
})
