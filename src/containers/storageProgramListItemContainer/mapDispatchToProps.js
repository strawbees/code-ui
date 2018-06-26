import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalUploadCode
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalUploadCode
})
