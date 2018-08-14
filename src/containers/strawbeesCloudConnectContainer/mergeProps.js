import {
	signin,
	signup,
	forgotPassword,
} from 'src/storage/backendStrawbees'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		programs
	} = stateProps
	const {
		closeModal,
		setCredentials,
		setUser,
		setRemoteMirror,
		...otherDispatchProps
	} = dispatchProps
	const {
		safeOpenDialogModal
	} = dispatchProps

	const onConnect = async ({ credentials, user }) => {
		if (Object.keys(programs).length) {
			try {
				await safeOpenDialogModal({
					titleKey        : 'ui.dialog.anonymous_copy_programs.title',
					descriptionKey  : 'ui.dialog.anonymous_copy_programs.description',
					confirmLabelKey : 'ui.dialog.anonymous_copy_programs.confirm',
					cancelLabelKey  : 'ui.dialog.anonymous_copy_programs.cancel',
					limitWidth      : true
				})
				setRemoteMirror(null)
			} catch (e) {}
		}
		setCredentials(credentials)
		setUser(user)
		closeModal()
	}

	const onSignup = async (values) => {
		const result = await signup(values)
		await onConnect(result)
	}

	const onSignin = async (values) => {
		const result = await signin(values)
		await onConnect(result)
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
