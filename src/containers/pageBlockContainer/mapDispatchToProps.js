import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'
import {
	safeOpenAlertAlternative,
	safeOpenConfirmAlternative,
	safeOpenPromptAlternative,
	safeOpenDialogModal
} from 'src/actions/modal'

const mapDispatchToProps = autobindDispatchToActionCreators({
	openDialog     : safeOpenDialogModal,
	openConfirm    : safeOpenConfirmAlternative,
	openAlert      : safeOpenAlertAlternative,
	openPrompt     : safeOpenPromptAlternative,
	onSourceChange : updateCurrentEditorProgramSource
})

export default mapDispatchToProps
