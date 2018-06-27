import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
} from 'src/actions/program'
import {
	setDisplayPageLoader,
	setDisplayError,
} from 'src/actions/setup'

export default autobindDispatchToActionCreators({
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
	setDisplayPageLoader,
	setDisplayError,
})
