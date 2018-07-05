import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setStatus,
	setCredentials,
	setPrograms,
	safeUpdateProgram,
} from 'src/actions/storage'
import {
	removeProgramByIdAndClearEditor,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	setStatus,
	setCredentials,
	setPrograms,
	safeUpdateProgram,
	removeProgramByIdAndClearEditor,
})
