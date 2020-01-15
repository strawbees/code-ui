import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'
import {
	safeOpenAlertAlternative,
	safeOpenPromptAlternative,
	safeOpenDialogModal
} from 'src/actions/modal'


export default autobindDispatchToActionCreators({
	openDialog     : safeOpenDialogModal,
	openAlert      : safeOpenAlertAlternative,
	openPrompt     : safeOpenPromptAlternative,
	onSourceChange : updateCurrentEditorProgramSource
})
