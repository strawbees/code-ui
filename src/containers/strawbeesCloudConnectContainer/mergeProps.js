import { createUser as strawbeesCreateUser } from 'src/storage/backendStrawbees'

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
		console.log(user)
	} catch (error) {
		throw error
	}
}

export default (stateProps, dispatchProps, ownProps) => {
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		createUser,
	}
}
