import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	openProgramByIdAndGoToEditor,
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalUploadCode
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	openProgramByIdAndGoToEditor,
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalUploadCode
})
