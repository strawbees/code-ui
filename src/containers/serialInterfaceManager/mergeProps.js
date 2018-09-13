import getConfig from 'next/config'
import { generateMethod } from 'src/utils/chromeExtensionApi'

const {
	publicRuntimeConfig : {
		CHROME_EXTENSION_ID
	}
} = getConfig()

export default (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	generateMethod,
	extensionId : CHROME_EXTENSION_ID
})
