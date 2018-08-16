import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenDialogModal,
	closeModal,
} from 'src/actions/modal'
import {
	setCredentials,
	setUser,
	setRemoteMirror,
} from 'src/actions/storage'
import {
	collapseAccountSettings,
} from 'src/actions/ui'

export default autobindDispatchToActionCreators({
	safeOpenDialogModal,
	closeModal,
	setCredentials,
	setUser,
	setRemoteMirror,
	collapseAccountSettings,
})
