import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	openProgramByIdAndGoToEditor,
	removeProgramByIdAndClearEditor,
} from 'src/actions/program'
import { openModal } from 'src/actions/modal'

export default autobindDispatchToActionCreators({
	openProgramByIdAndGoToEditor,
	removeProgramByIdAndClearEditor,
	openModal
})
