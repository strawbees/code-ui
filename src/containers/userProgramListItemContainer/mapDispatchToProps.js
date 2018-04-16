import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	openProgramByIdAndGoToEditor,
	removeProgramByIdAndClearEditor,
} from 'src/actions/program'
import { openDialogModal } from 'src/actions/modal'

export default autobindDispatchToActionCreators({
	openProgramByIdAndGoToEditor,
	removeProgramByIdAndClearEditor,
	openDialogModal
})
