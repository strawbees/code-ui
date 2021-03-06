import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeClearLoggedInData,
	safeDownloadCompleteData,
	modalDeleteAccount,
	modalChangePassword,
} from 'src/actions/storage'
import {
	expandAccountSettings,
	collapseAccountSettings,
} from 'src/actions/ui'

const mapDispatchToProps = autobindDispatchToActionCreators({
	logout         : safeClearLoggedInData,
	downloadData   : safeDownloadCompleteData,
	deleteAccount  : modalDeleteAccount,
	changePassword : () => modalChangePassword('strawbees'),
	expandAccountSettings,
	collapseAccountSettings,
})

export default mapDispatchToProps
