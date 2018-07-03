import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setStatus,
	setCredentials,
	setTempProgram,
	setPrograms,
	safeUpdateProgram,
} from 'src/actions/storage'
import {
	removeProgramByIdAndClearEditor,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	setStatus,
	setCredentials,
	setTempProgram,
	setPrograms,
	safeUpdateProgram,
	removeProgramByIdAndClearEditor,
})
