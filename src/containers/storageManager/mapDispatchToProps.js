import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setStatus,
	setCredentials,
	setTempProgram,
	setPrograms,
	safeUpdateProgram,
	safeRemoveProgram,
} from 'src/actions/storage'

export default autobindDispatchToActionCreators({
	setStatus,
	setCredentials,
	setTempProgram,
	setPrograms,
	safeUpdateProgram,
	safeRemoveProgram,
})
