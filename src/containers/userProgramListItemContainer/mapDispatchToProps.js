import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	openProgramByIdAndGoToEditor,
	modalRemoveProgram,
	modalDuplicateProgram
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	openProgramByIdAndGoToEditor,
	modalRemoveProgram,
	modalDuplicateProgram
})
