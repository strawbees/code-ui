import {
	signin,
	signup,
	forgotPassword ,
} from 'src/storage/backendStrawbees'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		closeModal,
		setCredentials,
		setUser,
		...otherDispatchProps
	} = dispatchProps

	const onSignup = async (values) => {
		try {
			const { credentials, user } = await signup(values)
			setCredentials(credentials)
			setUser(user)
			closeModal()
		} catch (error) {
			throw error
		}
	}

	const onSignin = async (values) => {
		try {
			const { credentials, user } = await signin(values)
			setCredentials(credentials)
			setUser(user)
			closeModal()
		} catch (error) {
			throw error
		}
	}

	const onForgotPassword = async (values) => {
		try {
			const result = await forgotPassword(values)
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
		onForgotPassword,
	}
}
