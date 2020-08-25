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

const mapDispatchToProps = autobindDispatchToActionCreators({
	setCredentials,
	setPrograms,
	setRemoteMirror,
	setStatus,
	setUser,
	safeUpdateProgram,
	removeProgramByIdAndClearEditor,
	safeSync,
})

export default mapDispatchToProps
