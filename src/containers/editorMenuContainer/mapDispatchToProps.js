import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
} from 'src/actions/editor'
import {
	modalUploadCode,
	modalDuplicateProgramData,
	modalImportProgram,
	exportProgramToFile,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	modalUploadCode,
	modalDuplicateProgramData,
	modalImportProgram,
	exportProgramToFile,
})
