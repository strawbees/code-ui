import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateCurrentEditorProgramName,
	resetCurrentEditorProgram,
	saveCurrentEditorProgram
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	onNameChange      : updateCurrentEditorProgramName,
	onSavePress       : saveCurrentEditorProgram,
	onNewPress        : resetCurrentEditorProgram,
	initializeProgram : resetCurrentEditorProgram
})
