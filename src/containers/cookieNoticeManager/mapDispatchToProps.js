import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setDisplayCookieNotice,
	setPauseTracking,
} from 'src/actions/setup'
import {
	safeOpenDialogModal,
} from 'src/actions/modal'

export default autobindDispatchToActionCreators({
	safeOpenDialogModal,
	setDisplayCookieNotice,
	setPauseTracking,
})
