import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		WINDOWS_DRIVERS_INSTALLER_URL,
		CHROME_EXTENSION_ID,
	}
} = getConfig()

export default (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	driverUrl    : WINDOWS_DRIVERS_INSTALLER_URL,
	extensionUrl : `https://chrome.google.com/webstore/detail/strawbees-code-helper/${CHROME_EXTENSION_ID}`,
})
