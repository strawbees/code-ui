import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		GAID,
	},
} = getConfig()

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	gaId : GAID,
})

export default mergeProps
