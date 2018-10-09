import {
	resolveBackendFromBackendName,
} from 'src/storage'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		token,
		...otherStateProps
	} = stateProps

	return {
		...otherStateProps,
		...dispatchProps,
		...ownProps,
		onSubmit : async ({ password }) => {
			const backend = resolveBackendFromBackendName('strawbees')
			const result = await backend.resetPassword({ token, password })
			console.log('result', result)
		}
	}
}
