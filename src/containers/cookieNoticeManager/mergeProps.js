import * as browserStorage from 'src/utils/browserStorage'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		safeOpenDialogModal,
		...otherDispatchProps
	} = dispatchProps

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		checkIfShouldDisplay : () => {
			if (browserStorage.get('cookie', 'hide-notice')) {
				return false
			}
			return true
		},
		openModal : () => safeOpenDialogModal(
			{
				titleKey              : 'ui.cookie_notice.title',
				descriptionKey        : 'ui.cookie_notice.description',
				confirmLabelKey       : 'ui.cookie_notice.confirm',
				descriptionIsMarkdown : true,
				displayCancel         : false,
				limitWidth            : true,
				onConfirm             : () => {
					browserStorage.set('cookie', 'hide-notice', true)
				},
			},
			null,
			true, // hide close button
		),
		onConfirm : (pauseTracking) => {
			setDisplayCookieNotice(false)
			setPauseTracking(pauseTracking)
			browserStorage.set('hideCookieNotice', true)
		},
	}
}
