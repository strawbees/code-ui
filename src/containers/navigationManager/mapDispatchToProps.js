import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenDialogModal,
} from 'src/actions/modal'
import {
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
} from 'src/actions/program'
import {
	setDisplayPageLoader,
	setDisplayError,
} from 'src/actions/setup'

export default autobindDispatchToActionCreators({
	safeOpenDialogModal,
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
	setDisplayPageLoader,
	setDisplayError,
})
