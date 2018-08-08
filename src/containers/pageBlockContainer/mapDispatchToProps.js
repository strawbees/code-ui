import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'
import { safeOpenPromptAlternative } from 'src/actions/modal'


export default autobindDispatchToActionCreators({
	prompt         : safeOpenPromptAlternative,
	onSourceChange : updateCurrentEditorProgramSource
})
