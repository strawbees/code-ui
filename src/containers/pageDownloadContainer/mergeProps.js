import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		DOWNLOAD_DESKTOP_APP_URL,
	},
} = getConfig()

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		setupOS,
		...otherStateProps
	} = stateProps
	return {
		...otherStateProps,
		...dispatchProps,
		...ownProps,
		currentPlatform : setupOS && setupOS.node && setupOS.node.platform,
		currentArch     : setupOS && setupOS.node && setupOS.node.arch,
		urls            : {
			win32 : {
				x64  : `${DOWNLOAD_DESKTOP_APP_URL}/win32/x64`,
				ia32 : `${DOWNLOAD_DESKTOP_APP_URL}/win32/ia32`,
			},
			darwin : {
				x64 : `${DOWNLOAD_DESKTOP_APP_URL}/darwin/x64`,
			},
		},
	}
}

export default mergeProps
