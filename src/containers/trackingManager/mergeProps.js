import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		GAID,
	}
} = getConfig()

export default (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	gaId : GAID,
})
