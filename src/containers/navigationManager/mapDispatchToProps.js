import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setStatus,
	setCredentials,
	setTempProgram,
	setPrograms,
} from 'src/actions/storage'

export default autobindDispatchToActionCreators({
	setStatus,
	setCredentials,
	setTempProgram,
	setPrograms
})
