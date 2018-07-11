import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenDialogModal,
	closeModal,
} from 'src/actions/modal'
import {
	setCredentials,
	setUser,
} from 'src/actions/storage'

export default autobindDispatchToActionCreators({
	safeOpenDialogModal,
	closeModal,
	setCredentials,
	setUser,
})
