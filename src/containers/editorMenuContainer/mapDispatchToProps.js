import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
} from 'src/actions/editor'
import {
	modalUploadCode,
	modalUploadBootloaderUpdater,
	modalDuplicateProgramData,
	modalShareProgramData,
	modalImportProgram,
	exportProgramToFile,
} from 'src/actions/program'

const mapDispatchToProps = autobindDispatchToActionCreators({
	updateCurrentEditorProgramName,
	saveCurrentEditorProgram,
	modalUploadCode,
	modalUploadBootloaderUpdater,
	modalDuplicateProgramData,
	modalShareProgramData,
	modalImportProgram,
	exportProgramToFile,
})

export default mapDispatchToProps
