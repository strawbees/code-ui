import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	resetCurrentEditorProgram,
	saveCurrentEditorProgram,
	modalUploadCode
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	resetCurrentEditorProgram,
	modalUploadCode
})
