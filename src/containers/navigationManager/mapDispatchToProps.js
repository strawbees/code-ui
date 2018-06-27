import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
})
