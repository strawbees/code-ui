import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'
import {
	safeOpenPromptAlternative,
	safeOpenDialogModal
} from 'src/actions/modal'


export default autobindDispatchToActionCreators({
	openDialog     : safeOpenDialogModal,
	openPrompt     : safeOpenPromptAlternative,
	onSourceChange : updateCurrentEditorProgramSource
})
