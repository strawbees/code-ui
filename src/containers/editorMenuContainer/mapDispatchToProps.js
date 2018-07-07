import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
} from 'src/actions/editor'
import {
	modalUploadCode,
	modalDuplicateProgramById,
	modalImportProgram,
	exportProgramToFile,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	modalUploadCode,
	modalDuplicateProgramById,
	modalImportProgram,
	exportProgramToFile,
})
