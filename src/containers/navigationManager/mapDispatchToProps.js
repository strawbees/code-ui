import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	resetCurrentEditorProgram,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	resetCurrentEditorProgram,
})
