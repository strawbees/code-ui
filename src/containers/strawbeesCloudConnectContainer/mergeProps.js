import {
	signin,
	signup,
	requestPasswordReset as strawbeesRequestPasswordReset,
} from 'src/storage/backendStrawbees'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		closeModal,
		setCredentials,
		...otherDispatchProps
	} = dispatchProps

	const onSignup = async (values) => {
		try {
			const data = await signup(values)
			setCredentials(data)
			closeModal()
		} catch (error) {
			throw error
		}
	}

	const onSignin = async (values) => {
		try {
			const data = await signin(values)
			setCredentials(data)
			closeModal()
		} catch (error) {
			throw error
		}
	}

	const requestPasswordReset = async (values) => {
		try {
			const result = await strawbeesRequestPasswordReset(values)
			console.log('todo: do somthing with result', result)
		} catch (error) {
			throw error
		}
	}

	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onSignup,
		onSignin,
		requestPasswordReset,
	}
}
