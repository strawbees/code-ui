import {
	createUser as strawbeesCreateUser,
	authenticateUser as strawbeesAuthenticateUser,
	requestPasswordReset as strawbeesRequestPasswordReset,
} from 'src/storage/backendStrawbees'

const createUser = async (values) => {
	const birth = new Date(new Date().setYear(new Date().getFullYear() - values.age))
	const month = birth.getUTCMonth() + 1 // months from 1-12
	const day = birth.getUTCDate()
	const year = birth.getUTCFullYear()
	const birthdate = `${year}-${month}-${day}`
	try {
		const user = await strawbeesCreateUser({
			username : values.username,
			email    : values.email,
			password : values.password,
			birthdate
		})
		console.log('todo: do somthing with wuser', user)
	} catch (error) {
		throw error
	}
}

const authenticateUser = async (values) => {
	try {
		const credentials = await strawbeesAuthenticateUser({
			username : values.username,
			password : values.password,
		})
		console.log('todo: do somthing with credentials', credentials)
	} catch (error) {
		throw error
	}
}

const requestPasswordReset = async (values) => {
	try {
		const result = await strawbeesRequestPasswordReset({
			username : values.username
		})
		console.log('todo: do somthing with result', result)
	} catch (error) {
		throw error
	}
}

export default (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	createUser,
	authenticateUser,
	requestPasswordReset,
})
