import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	resetCurrentEditorProgram,
	saveCurrentEditorProgram,
	modalUploadCode,
	modalDuplicateProgramById,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	resetCurrentEditorProgram,
	modalUploadCode,
	modalDuplicateProgramById,
})
