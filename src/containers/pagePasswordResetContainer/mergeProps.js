import {
	resolveBackendFromBackendName,
} from 'src/storage'

const mergeProps = (stateProps, dispatchProps, ownProps) => {
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
			return backend.resetPassword({ token, password })
		}
	}
}

export default mergeProps
