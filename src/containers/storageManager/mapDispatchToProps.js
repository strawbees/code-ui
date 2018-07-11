import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCredentials,
	setPrograms,
	setRemoteMirror,
	setStatus,
	setUser,
	safeUpdateProgram,
	safeSync,
} from 'src/actions/storage'
import {
	removeProgramByIdAndClearEditor,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	setCredentials,
	setPrograms,
	setRemoteMirror,
	setStatus,
	setUser,
	safeUpdateProgram,
	removeProgramByIdAndClearEditor,
	safeSync,
})
