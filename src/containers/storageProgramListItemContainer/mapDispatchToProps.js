import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
} from 'src/actions/modal'
import {
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalShareProgramData,
	modalUploadCode,
	exportProgramToFile,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	safeOpenModal,
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalShareProgramData,
	modalUploadCode,
	exportProgramToFile,
})
