import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
} from 'src/actions/modal'
import {
	modalDuplicateProgramData,
	modalUploadCode,
	exportProgramToFile,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	safeOpenModal,
	modalDuplicateProgramData,
	modalUploadCode,
	exportProgramToFile,
})
