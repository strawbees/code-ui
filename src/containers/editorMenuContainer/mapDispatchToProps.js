import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	modalUploadCode,
	modalDuplicateProgramById,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	modalUploadCode,
	modalDuplicateProgramById,
})
