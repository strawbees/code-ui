import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	openProgramByIdAndGoToEditor,
	removeProgramByIdAndClearEditor,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	openProgramByIdAndGoToEditor,
	removeProgramByIdAndClearEditor
})
