import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
} from 'src/actions/modal'
import {
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalUploadCode
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	safeOpenModal,
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalUploadCode,
})
