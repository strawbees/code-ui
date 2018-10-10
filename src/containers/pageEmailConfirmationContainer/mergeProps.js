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
		onSubmit : () => {
			const backend = resolveBackendFromBackendName('strawbees')
			return backend.confirmEmail(token)
		}
	}
}
